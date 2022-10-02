import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isLogged: boolean = false
  constructor(private loginService: LoginService, private router: Router) { 
    this.router.events.subscribe((val) => {
      this.checkIsLogged()
    })
  }
  
  private checkIsLogged() {
    this.isLogged = localStorage.getItem('token') != null;
  }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('token') != null
  }

  logout() {
    this.isLogged = false
    localStorage.removeItem('token')
    this.router.navigate([''])
  }

}
