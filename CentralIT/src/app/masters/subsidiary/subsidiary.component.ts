import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subsidiary',
  templateUrl: './subsidiary.component.html',
  styleUrls: ['./subsidiary.component.scss']
})
export class SubsidiaryComponent implements OnInit {

  filter = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newSubsidiary(){
    this.router.navigate(['newsubsidiary']);
  }
}
