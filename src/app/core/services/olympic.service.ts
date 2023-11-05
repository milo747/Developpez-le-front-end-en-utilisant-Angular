import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  private countries: Country[] = [];
  private dataLoaded: boolean = false;
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.countries = value;
        this.dataLoaded = true;
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

  getParticipationByCountryId(Id: number): Participation[] {
    let countryParticipations: Participation[] = [];
    //while (!this.dataLoaded) {
    //}
    if (this.dataLoaded) console.log('data');
    return countryParticipations;
  }
}
