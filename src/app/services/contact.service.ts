import { Injectable } from '@angular/core';
import { Contact } from 'src/models/contact.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [
    {
      id: '1234',
      name: 'Jose Rodriguez',
      cellphone: '664 1234567',
      email: 'jose.rodriguez@gmail.com'
    },
    {
      id: '12345',
      name: 'Rodolfo Avalos',
      cellphone: '664 7654321',
      email: 'ra123@gmail.com'
    },
    {
      id: '1243',
      name: 'Jaime López',
      cellphone: '686 2403954',
      email: 'jaime.lopez@gmail.com'
    }
  ];
  constructor() {}

  getContacts(): Promise<Contact[]> {
    return new Promise ((resolve, reject) => {
      resolve(this.contacts as Contact[]);
    });
  }

  getContact(id: string): Promise<Contact> {

    return new Promise((resolve, reject) => {
      const foundContact = this.contacts.find((contact) => {
        return contact.id === id;
      });

      if (foundContact) {
        resolve(foundContact);
      } else {
        reject(null);
      }
    });

  }
  deleteContact(contactid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const remainingContacts = this.contacts.filter((contact) => {
        return contact.id !== contactid;
      });

      if (JSON.stringify(remainingContacts) !== JSON.stringify(this.contacts)) { // convierte la cadena en string
        this.contacts = remainingContacts;
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  updateBook(contactid: string, updatecontact: Contact): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const updatedContacts = this.contacts.map((contact) => {
        if (contact.id === contactid) {
          const newContact = {
            ...contact,
            ...updatecontact
          };
          return newContact;
        }
        return contact;
      });

      if (JSON.stringify(updatedContacts) !== JSON.stringify(this.contacts)) {
        this.contacts = updatedContacts;
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  addContact(contact: Contact): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.contacts.push(contact);

      resolve(true);
    });
  }

}
