import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);
  private participations$ = new BehaviorSubject<Participation[]>([]);
  private countries: Country[] = [];
  private dataLoaded: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.countries = value;
        this.dataLoaded = true;

        //regarder le parametre d'url et charger le bon contenu

        this.participations$.next(p2);
        console.log(this.participations$);
        console.log(this.router.url);
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        //this.olympics$.next(null);
        return caught;
      })
    );
  }

  getDataLoaded() {
    return this.dataLoaded;
  }

  // getCountryById(id: number) {
  //   let coun: Country;
  //   coun = this.countries.find((country) => country.id == id)!;
  //   return coun;
  // }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getParticipations() {
    //this.participations$.next(p);
    return this.participations$;
  }

  getParticipationByCountryId(Id: number) {
    //let bs = new BehaviorSubject<Participation[]>([]);
    //bs.next(p2);
    this.participations$.next(p);
    this.participations$.next(p);
    //this.participations$.subscribe();
    console.log(this.participations$.getValue());
  }

  // getParticipationByCountryId(Id: number): Participation[] {
  //   let countryParticipations: Participation[] = [];
  //   //while (!this.dataLoaded) {
  //   //}
  //   if (this.dataLoaded) console.log('data');
  //   return countryParticipations;
  // }
}

let p = [
  {
    id: 3,
    year: 2020,
    city: 'Tokyo',
    medalsCount: 113,
    athleteCount: 626,
  },
];

let p2 = [
  {
    id: 3,
    year: 2020,
    city: 'Tollllllllllllllkyo',
    medalsCount: 113,
    athleteCount: 626,
  },
  {
    id: 3,
    year: 2020,
    city: 'Tollllooooooollllkyo',
    medalsCount: 113,
    athleteCount: 626,
  },
];
