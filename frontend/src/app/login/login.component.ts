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
  pwhash = ''
  password = ''
  login = ''
  result = ''
  alert_success_template_start = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
  alert_danger_template_start = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
  alert_template_end = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  get_key = () => {
    $.get('http://localhost:8080/gen_key.php', {}, (data: string) => {
      this.key = data;
    }, "text")
  };

  hash_pw = (pw: string) => {
    this.pwhash = sha3_256(this.password);
    this.hash = sha3_256(this.key + this.pwhash);
  }

  onLoginSubmit() {
    $.post('http://localhost:8080/login.php', {login:this.login, hash:this.hash}, (data: string) => {
      this.result = data;
      if (this.result == "Success"){
        $("#alert-box").append(this.alert_success_template_start + "Successfully logged in!" + this.alert_template_end)
      } else {
        $("#alert-box").append(this.alert_danger_template_start + "There was an error during logging in: " + this.result + this.alert_template_end)
      }
    }, "text")
  }

  ngOnInit(){
    this.get_key();
  }

}
