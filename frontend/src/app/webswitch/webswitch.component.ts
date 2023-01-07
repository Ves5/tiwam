import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-webswitch',
  templateUrl: './webswitch.component.html',
  styleUrls: ['./webswitch.component.css']
})
export class WebswitchComponent {

  switch = {site: '', odds: 0};

  switchSite(){
    $.get('http://localhost:8080/webswitch.php', null, (data: any) => {
      this.switch.odds = data.odds.toFixed(2);
      this.switch.site = data.site;
    }, "json");
  }

  ngOnInit(){
    this.switchSite();
  }
}
