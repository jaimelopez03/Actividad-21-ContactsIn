import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from 'src/models/contact.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  contact: Contact;
  contactForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private contactService: ContactService,
              private router: Router) { }

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.paramMap.get('contactId');
    this.getContact(contactId);
    this.initForm();
  }
  initForm() {
    this.contactForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cellphone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    });
  }
  patchForm() {
    this.contactForm.patchValue({
      ...this.contact
    });
  }
  getContact(contactId: string) {
    this.contactService.getContact(contactId).then((contact: Contact) => {
      this.contact = contact;
      console.log(contact);
      this.patchForm();
    }).catch((error) => {
      this.router.navigate(['contacts', 'management']);
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        id: this.contact.id,
        ...this.contactForm.value
      };

      this.contactService.updateContact(this.contact.id, updatedContact).then((res) => {
        this.router.navigate(['management']);
      }).catch((error) => {
        alert('Ocurrio un error al actualizar el contacto.');
      });
    } else {
      alert('Tu forma no esta completa');
    }
  }
}
