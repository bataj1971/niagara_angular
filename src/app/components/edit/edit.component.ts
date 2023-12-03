import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  @Input() title:string = '';
  @Input() create:boolean = false;
  @Input() errorMessage:string = "";
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter();
  saveForm() {    
    this.onSubmit.emit(true);
  }
  cancelForm() {    
    this.onSubmit.emit(false);
  }

  submitForm(){
    alert("submitForm");
  }

}
