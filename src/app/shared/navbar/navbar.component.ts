import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  token: string;

  constructor(private authService: AuthenticationService) {
    this.authService.isLoggedIn.asObservable().subscribe(v => {
      this.token = v;
    })
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
