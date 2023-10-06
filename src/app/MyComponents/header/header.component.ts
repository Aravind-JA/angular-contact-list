import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/Services/api-calls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private apiCalls: ApiCallsService) { }
  searchQuery!: string;
  totalDataLength!: number;

  ngOnInit(): void {
    this.Initialisation();
    this.apiCalls.RefreshRequired.subscribe((data) => {
      this.Initialisation();
    })
  }

 async Initialisation() {
   (await this.apiCalls.getData(1)).subscribe((data:any) => {
     this.totalDataLength = data.length;
  })
  }

  search(query: string) {
    if (query !== undefined) {
      this.router.navigate([`search`], { queryParams: { search: query } });
    }
  }

  goHome() {
    this.router.navigate(['home']);
  }
}
