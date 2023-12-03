import { Injectable } from '@angular/core';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageManagerService {

  messagesToShow: Array<Message> = [];
  messagesArchive: Array<Message> = [];
  lastUpdateTimeStamp:number = 0;
  messageShowInterval:number = 10;
  setIntervalhandler ;
  maxMessagesToShow = 5;



  constructor() {
    // use settimeout - environment does not clear setintervals 
    this.setIntervalhandler = setInterval(() => this.updateMessageToShowList() ,2000);    
    
  }
  
  addMessage(text:string , messageType:string = 'info' ) {
    let message = new Message(text,messageType);
    this.messagesToShow.push(message);
    this.updateMessageToShowList();
  }
  addErrorMessage(text:string ) {
    this.addMessage(text,'error');
  }

  getMessageList() : Array<Message> {
    return this.messagesToShow;
  }


  updateMessageToShowList(){
    
    // removing messages created before last update - 10 sec
    let i = this.messagesToShow.length;
    let messageInQueue = 0;
    // console.log('updateMessageToShowList');

    while( i-- ) {
        
        let message = this.messagesToShow[i];
        // console.log('Checking message:',i,message);
        if (
            message.timeStamp < this.lastUpdateTimeStamp - this.messageShowInterval*1000 
            ||
            messageInQueue >= this.maxMessagesToShow
           ) {
          
          // copy reference to archive
          this.messagesArchive.push(message);

          // remove reference from messagelist
          this.messagesToShow.splice(i,1);
          // console.log('Message archived:', message);
        } else {
          messageInQueue++;
        }
    } 

    // set new update-time:
    this.lastUpdateTimeStamp = new Date().getTime();    
    // setTimeout(() => this.updateMessageToShowList() ,2000);
  }

}
