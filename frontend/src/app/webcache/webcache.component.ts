import { Component } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-webcache',
  templateUrl: './webcache.component.html',
  styleUrls: ['./webcache.component.css']
})
export class WebcacheComponent {

  origin = '';
  catfact = '';
  time = 0;

  getCatFact(){
    $.get('http://localhost:8080/webcache.php', null, (data: any) => {
      this.origin = data.from;
      this.catfact = data.content.fact;
      this.time = data.ttl;
    }, "json");
  }

  ngOnInit(){
    this.getCatFact();
  }
}
