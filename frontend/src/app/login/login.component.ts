import { Component } from '@angular/core';
import { sha3_256 } from 'js-sha3';
declare var $: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  key = ''
  hash = ''
  password = ''
  login = ''
  result = ''

  get_key = () => {
    $.get('http://localhost:8080/gen_key.php', {}, (data: string) => {
      this.key = data;
    }, "text")
  };

  hash_pw = (pw: string) => {
    this.hash = sha3_256(this.key + sha3_256(this.password));
  }

  onLoginSubmit() {
    $.get('http://localhost:8080/login.php', {login:this.login, hash:this.hash}, (data: string) => {
      this.result = data;
    }, "text")
  }

  ngOnInit(){
    this.get_key();
  }

}
