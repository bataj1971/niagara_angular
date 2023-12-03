import { Component, Inject, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MessageManagerService } from 'src/app/services/message-manager.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messagesToShow : Array<Message> = [];

  constructor(  @Inject(MessageManagerService) private messageManagerService: MessageManagerService) { }

  ngOnInit() {

    this.messagesToShow = this.messageManagerService.getMessageList();

    // add some dellayed test messages
    this.messageManagerService.addMessage('Messages . . ');    
  }

}
