import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token: string;

  constructor(private authService: AuthenticationService) {
    this.token = this.authService.getToken();
  }

  logout() {
    this.authService.removeToken();
  }
  
}
