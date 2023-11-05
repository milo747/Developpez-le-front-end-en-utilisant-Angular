import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Country } from '../core/models/Olympic';
import { Participation } from '../core/models/Participation';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.scss'],
})
export class SingleCountryComponent implements OnInit {
  public param!: number;
  // public coun!: Country;
  public olympics$: Observable<Country[] | null> = of(null);
  public participations$!: BehaviorSubject<Participation[]>;
  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.param = +this.route.snapshot.params['id'];
    this.olympics$ = this.olympicService.getOlympics();
    this.participations$ = this.olympicService.getParticipations();
    //console.log(this.participations$.getValue());
    //this.olympicService.getParticipationByCountryId(this.param);
    //this.olympicService.getParticipationByCountryId(this.param);
    //this.coun = this.olympicService.getCountryById(this.param);
    //console.log(this.route.url);
  }
}
