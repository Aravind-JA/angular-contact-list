import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact.interface';
import { ApiCallsService } from 'src/app/Services/api-calls.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  phone: number | null = null;
  email: string = '';
  contactId: string = '';

  contact: Contact = {
    firstName: '',
    lastName: '',
    phone: null,
    email: ''
  }

  showForm: boolean = false;
  onDelete: boolean = false;

  constructor(private apiCalls: ApiCallsService) { }
  @Input() data: any;
  @Input() currentPage: number = 1;

  ngOnInit(): void {

  }

  async openEditContact(id: string) {
    console.log("Edit contact : " + id);
    (await this.apiCalls.getOneData(id)).subscribe((val: any) => {
      this.contactId = val._id;
      this.contact.firstName = val.firstName;
      this.contact.lastName = val.lastName;
      this.contact.phone = val.phone;
      this.contact.email = val.email;
      this.showForm = true;
    });
  }

  async openDeleteContact(id: string) {
    this.contactId = id;
    this.onDelete = true;
  }

  async deleteContact() {
    await this.apiCalls.deleteData(this.contactId);
    this.onDelete = false;
  }

}
