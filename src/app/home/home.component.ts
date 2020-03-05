import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { ContactService } from '../services/contact.service';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  contacts: Contact[];
  constructor(private contactService: ContactService) {}
  ngOnInit(): void {
    $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
      });
  }
}
