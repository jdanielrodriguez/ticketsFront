import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools-nav-bar',
  templateUrl: './tools-nav-bar.component.html',
  styles: []
})
export class ToolsNavBarComponent implements OnInit {
  currenturl = ""
  constructor(
    private router: Router
  ) { }

  setActiveClass(currentUrl, evalUrl) {
    return currentUrl == evalUrl;
  }

  ngOnInit() {
    this.currenturl = this.router.url.split('/')[3];
  }

}
