import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact.interface';
import { ApiCallsService } from 'src/app/Services/api-calls.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  showForm: boolean = false;

  constructor(private apiCalls: ApiCallsService) { }
  
  data: any;
  currentPage: number = 1;
  onError: boolean = false;
 

  firstName: string = '';
  lastName: string = '';
  phone: number | null = null;
  email: string = '';
  contactId: string = '';

  firstNameError: boolean = false;
  lastNameError: boolean = false;
  phoneError: boolean = false;
  emailError: boolean = false;

  ngOnInit(): void {
    this.PageIntialisation()
    this.apiCalls.RefreshRequired.subscribe(result => {
      this.PageIntialisation();
    });
  }

  async PageIntialisation() {
    try {
      (await this.apiCalls.getData(this.currentPage)).subscribe((res) => {
        this.data = res;
        console.log("data",this.data);
        this.onError = false;
      });
    } catch (e) {
      this.onError = true;
    }
  }

  ShowForm() {
    this.showForm = true;
  }

  totalPages(n: number): Array<number> {
    const num = Math.ceil(n);
    return Array(num);
  }

  setPage(num: number) {
    this.currentPage = num;
    this.PageIntialisation();
  }

}
