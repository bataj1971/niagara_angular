import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerMessage:string;
  showMessages;

  constructor() { 
    this.footerMessage = '@batajozsef-2023   [using api:'+environment.envName + " : "+environment.apiURL+']';
    this.showMessages = true;
  }

  ngOnInit() {
  }
  setShowMessagages(show:boolean) {
    this.showMessages = show;
  }
}
