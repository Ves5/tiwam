import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rev = false;
  sort = "pozycja";
  filter = "";
  imiona: any;

  refresh = (filter: string) => {
    $.get('http://localhost:8080/imiona.php', {"filter": filter ?? ""}, (data: string) => {
      this.imiona = data;
    }, "json")
  };

  ngOnInit(){
    this.refresh(this.filter);
  }
}
