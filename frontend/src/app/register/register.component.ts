import { Component } from '@angular/core';
import { sha3_256 } from 'js-sha3';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  login = ""
  password = ""
  result = ""
  alert_success_template_start = '<div class="alert alert-success alert-dismissible fade show" role="alert">'
  alert_danger_template_start = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
  alert_template_end = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  onRegisterSubmit(){
    if (this.login != "" && this.password != ""){
      var hash = sha3_256(this.password);
      $.post('http://localhost:8080/register.php', {login:this.login, pwhash: hash}, (data: string) => {
        this.result = data;
        if (this.result == "Success"){
          $("#alert-box").append(this.alert_success_template_start + "Registration processed succesfully" + this.alert_template_end)
        } else {
          $("#alert-box").append(this.alert_danger_template_start + "There was an error during registration" + this.alert_template_end)
        }
      }, "text")
    } else {
      $("#alert-box").append(this.alert_danger_template_start + "Missing required fields" + this.alert_template_end)
    }
  }

}
