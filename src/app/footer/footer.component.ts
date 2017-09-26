import { Component, OnInit } from '@angular/core';
import { Mail } from "../classes/mail";
import { MailService } from "../services/mail.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  mail = new Mail();

  constructor(private mailService: MailService) { }

  onSubmit(form) {
    console.log(form)
    return this.mailService.sendMail(form)
    .then((res) => console.log(res))
    .catch(err => {
      console.log('catching errors', err);
    })

  }

  ngOnInit() {
  }

}
