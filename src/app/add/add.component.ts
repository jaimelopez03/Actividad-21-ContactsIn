import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/models/contact.model';
import { ContactService } from '../services/contact.service';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  contactForm: FormGroup;
  newContact: Contact;
  contact: Contact;
  constructor(private router: Router,
              private contactService: ContactService) {}

  ngOnInit(): void {
    $('.fixed-action-btn').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
      }),
    $('.modal').modal();
    this.initForm();

  }
  initForm() {
    this.contactForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cellphone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      const newContact: Contact = {
        ...this.contactForm.value
      };
      this.contactService.addContact(newContact).then((result) => {
        this.router.navigate(['']);
      }).catch(() => {
        alert('No se pudo agregar el contacto');
      });
      console.log(newContact);
    } else {
      const corre = true;
      if (corre === true) {
        alert('Tu forma no esta completa');
        this.router.navigate(['add']);
      }
    }
  }
}
