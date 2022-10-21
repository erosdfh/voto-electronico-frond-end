import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'body',
  template:'<router-outlet></router-outlet>',
  //styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'voto-electronico-frond-end';

  constructor(
  private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }



}
