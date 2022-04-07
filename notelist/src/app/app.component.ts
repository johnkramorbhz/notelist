import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titles: string[] = [];
  title: string = 'notelist';
  content!: string;
  ngOnInit(): void {
    for (let [key, value] of Object.entries(localStorage)) {
      this.titles.push(key);
      console.log("key: \"" + key + "\"" + ", val: \"" + value + "\"")
    }
    this.title = "";
  }
  onTitle(ttl: string) {
    this.title = ttl;
    this.content = localStorage.getItem(ttl) || '';
  }
  onDelete(ttl: string) {
    localStorage.removeItem(ttl);
    this.titles = this.titles.filter((target) => target !== ttl);
  }
  onAdd() {
    this.title = "";
    this.content = "";
  }
  getContents(title: string) {
    if (!this.titles.find((target) => target === title)) {
      this.titles.push(title);
    }
  }
}
