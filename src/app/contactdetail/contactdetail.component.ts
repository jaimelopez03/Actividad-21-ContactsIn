import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Contact } from 'src/models/contact.model';
import { ContactService } from '../services/contact.service';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.sass']
})
export class ContactdetailComponent implements OnInit {
  contact: Contact;
  contacts: Contact[];
  contactForm: FormGroup;
  display = false;
  constructor(private router: Router,
              private contactService: ContactService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
      }),
    $('.modal').modal();
    const contactId = this.activatedRoute.snapshot.paramMap.get('contactId');
    this.getContact(contactId);
    this.initForm();
    this.getContacts();
  }
  initForm() {
    this.contactForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cellphone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    });
  }
  getContact(contactId: string) {
    this.contactService.getContact(contactId).then((contact: Contact) => {
      console.log(contact);
      this.contact = contact;
    }).catch((error) => {
      console.log(error);
      this.router.navigate(['contact/:contactId']);
    });
  }
  updateDisplay() {
    this.display = !this.display;
  }
  return() {
    this.router.navigate(['']);
  }
  getContacts() {
    this.contactService.getContacts().then((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).then((result) => {
      this.getContacts();
    }).catch((error) => {
      console.log(error);
    });
  }
  patchForm() {
    this.contactForm.patchValue({
      ...this.contact
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        id: this.contact.id,
        ...this.contactForm.value
      };

      this.contactService.updateContact(this.contact.id, updatedContact).then((res) => {
      this.router.navigate(['contact', 'contact.id']);
      }).catch((error) => {
        alert('Ocurrio un error al actualizar el contacto.');
      });
    } else {
      alert('Tu forma no esta completa');
    }
  }
  onSubmit2() {
    if (this.contactForm.valid) {
      const contactUpdate: Contact = {
        id: this.contact.id,
        ...this.contactForm.value
      };

      this.contactService.updateContact(this.contact.id, contactUpdate).then((res) => {
        this.router.navigate(['']);
      }).catch((error) => {
        alert('Ocurrio un error al actualizar el contacto');
      });
    } else {
      alert('Completa todos los campos');
    }
  }
}
