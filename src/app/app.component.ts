import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', Validators.required)
  });
  success?: boolean;


  constructor(private http: HttpClient) {

  }

  login(): void {
    const data = new URLSearchParams();
    data.set('username', this.loginForm?.value?.username as string);
    data.set('password', this.loginForm?.value?.password as string);
    data.set('grant_type', 'password');
    data.set('client_id', 'GeneralAgent');
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    };
    this.http.post('/token', data.toString(), options).subscribe({
      next: res => {
        console.log(res);
        this.success = true;
      },
      error: err => {
        console.log(err);
        this.success = false;
      }
    });
  }
}


