import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://bento-client.vercel.app/logout';
  }
}
