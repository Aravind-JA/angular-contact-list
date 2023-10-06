import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact.interface';
import { ApiCallsService } from 'src/app/Services/api-calls.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  [x: string]: any;

  @Input() contactId!: string;
  @Input() contact!: Contact;
  @Input() showForm: boolean = false;
  @Output() showFormChange = new EventEmitter<boolean>();


  firstNameError: boolean = false;
  lastNameError: boolean = false;
  phoneError: boolean = false;
  emailError: boolean = false;

  firstName: string = '';
  lastName: string = '';
  phone: number | null = null;
  email: string = '';

  constructor(private apiCalls: ApiCallsService) { }
  
  ngOnInit(): void {
    if (this.contact) {
      this.firstName = this.contact.firstName;
      this.lastName = this.contact.lastName;
      this.phone = this.contact.phone;
      this.email = this.contact.email;
    }
  }

  onSubmit() {
    this.firstNameError = !this.validateName(this.firstName);
    this.lastNameError = !this.validateName(this.lastName);
    this.phoneError = !this.validatePhone(this.phone);
    this.emailError = !this.validateEmail(this.email);

    const validErrors = this.firstNameError || this.lastNameError || this.phoneError || this.emailError;
    if (!validErrors) {
      if (this.contactId === '') {
        this.addContact();
      } else if (this.contact) {
        this.editContact();
      }
    }
  }

  async addContact() {
    const contact: Contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email
    }
    await this.apiCalls.postData(contact);
    this.closeForm();
  }

  async editContact() {
    const contact: Contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email
    }
    console.log(contact);
    await this.apiCalls.putData(this.contactId, contact);
    this.closeForm();
  }

  closeForm() {
    this.showForm = false;
    this.showFormChange.emit(this.showForm);

    this.firstName = '';
    this.lastName = '';
    this.phone = null;
    this.email = '';
    this.firstNameError = false;
    this.lastNameError = false;
    this.phoneError = false;
    this.emailError = false;
  }

  validateName(name: string) {
    const nameRegex = /^[a-zA-Z]+$/;
    return name.trim() !== '' && nameRegex.test(name);
  }

  validatePhone(num: number | null) {
    const phoneRegex = /^[1-9]\d{9}$/;
    return num !== null && phoneRegex.test(num!.toString());
  }

  validateEmail(mail: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return mail.trim() !== '' && emailRegex.test(mail);
  }

}
