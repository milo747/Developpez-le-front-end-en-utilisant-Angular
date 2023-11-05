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
  public countries: Country[] = this.olympicService.getCountries();
  public olympics$: Observable<Country[] | null> = of(null);
  public participations$!: BehaviorSubject<Participation[]>;

  public monObservable!: Observable<boolean>;

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
    this.monObservable = new Observable((observer) => {
      console.log('Observable starts');
      observer.next(true);
      observer.next(false);
      observer.next(true);
    });
    this.monObservable.subscribe({
      next: (val) => {
        console.log(val);
      },
    });
    setTimeout(() => this.monObservable, 1000);
  }
}
