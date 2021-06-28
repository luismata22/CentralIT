import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  filter = new FormControl('');
  page = 1;
  pageSize = 4;
  collectionSize = 10;
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  newCompany(){
    this.router.navigate(['newcompany']);
  }
}
