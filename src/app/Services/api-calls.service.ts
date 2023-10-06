import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Interfaces/Contact.interface';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  constructor(private http: HttpClient) { }

  private _refreshRequired = new Subject<void>();

  get RefreshRequired() {
    return this._refreshRequired;
  }

  async getData(page:number) {
    return this.http.get(`http://localhost:3006/data/?page=${page}`);
  }

  async getOneData(id: string) {
    return this.http.get(`http://localhost:3006/data/${id}`);
  }

  async postData(data: Contact) {
    return this.http.post('http://localhost:3006/data', data)
      .subscribe((data: any) => {
        this.RefreshRequired.next();
        console.log(data);
      });
  }

  async deleteData(id: string) {
    this.http.delete(`http://localhost:3006/data/${id}`)
      .subscribe((data) => {
        this.RefreshRequired.next();
        console.log(data);
      });
  }

  async putData(id: string, data: Contact) {
    this.http.put(`http://localhost:3006/data/${id}`, data)
      .subscribe((data: any) => {
        this.RefreshRequired.next();
        console.log(data);
      });
  }

  async searchData(query: string) {
   return this.http.get(`http://localhost:3006/data/search/?search=${query}`);
  }
}
