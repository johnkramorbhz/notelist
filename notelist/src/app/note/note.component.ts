import {   Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnChanges {
  @Output() titleCreated = new EventEmitter<string>();
  //From appComponent
  @Input() insertedTitle!: string;
  @Input() insertedContent!: string;
  title!: string;
  contents!: string;
  //Save the one for when creating a new title
  savedTitle!: string;
  deltaContent!: string;
  constructor() { }

  ngOnInit() {
    this.title = this.insertedTitle;
    this.contents = this.insertedContent;
    console.log("ttl: \""+this.title+"\"")
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['insertedTitle']) {
      this.title = changes['insertedTitle'].currentValue;
    } else {
      this.title = this.savedTitle;
    }
    if (changes['insertedContent'])
      this.contents = changes['insertedContent'].currentValue;
  }
  onSave(){
    this.titleCreated.emit(this.title);
    if (
      !localStorage.getItem(this.title) ||
      localStorage.getItem(this.title) !== this.contents
    ) {
      localStorage.setItem(`${this.title}`, this.contents);
      this.savedTitle = this.title;
      this.title = '';
      this.contents = '';
    }
  }
  onRevert(){
    this.contents = localStorage.getItem(this.title) || '';
  }

}
