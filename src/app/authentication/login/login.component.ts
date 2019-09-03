import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Token } from '../../models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token: Token;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { 
      this.loginForm = this.formBuilder.group({
        username: [''],
        password: ['']
      })
  }

  ngOnInit() {
  }

  logForm() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(token => {
      this.token = token;
      this.authService.setToken(this.token.key)
      console.log(token);
    })
  }

}
