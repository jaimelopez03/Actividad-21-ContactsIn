import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit{
  contacts: Contact[];
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }
  getContacts() {
    this.contactService.getContacts().then((contacts) => {
      this.contacts = contacts;
    });
  }

}

