import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.scss'],
})
export class SingleCountryComponent implements OnInit {
  public param!: number;
  public coun!: Country;
  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.param = +this.route.snapshot.params['id'];
    this.coun = this.olympicService.getCountryById(this.param);
  }
}
