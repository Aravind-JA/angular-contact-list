import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallsService } from 'src/app/Services/api-calls.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute,private apiCalls:ApiCallsService) { }
  query!: string;
  data: any

  async ngOnInit(): Promise<void> {
    this.activeRoute.queryParams.subscribe((val) => {
      this.query = val['search'];
      this.Intialisation();
    });
    this.apiCalls.RefreshRequired.subscribe(result => {
      this.Intialisation();
    });
  }

  async Intialisation() {
    (await this.apiCalls.searchData(this.query)).subscribe((val) => {
      this.data = val;
    });  
  }

}
