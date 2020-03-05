import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.sass']
})
export class ManagementComponent implements OnInit {
  contacts: Contact[];
  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
    this.getContacts();
  }
  getContacts() {
    this.contactService.getContacts().then((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  deleteBook(contactId: string) {
    this.contactService.deleteContact(contactId).then((result) => {
      this.getContacts();
    }).catch((error) => {
      console.log(error);
    });
  }

  editBook(contactId: string) {
    this.router.navigate(['edit', contactId]);
  }

}
