// import { DatePipe } from '@angular/common';

export class Message {
  time:string;
  timeStamp:number;
  text:string;
  messageType:string;
  

  constructor ( text:string  , messageType:string = 'info'){
      let date = new Date();
      
      this.time = date.toLocaleTimeString();       
      this.timeStamp = date.getTime();
      
      this.text = text;
      console.log('Message / created / [ (type:' + messageType + ') '+this.time+' - '+ text +']');
      this.messageType  = 'message ' + messageType;
  }
};