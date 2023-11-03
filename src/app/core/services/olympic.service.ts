import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic.model';
import { Participation } from '../models/Participation.model';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  private country!: OlympicCountry[];
  private participation!: Participation[];

  constructor(private http: HttpClient) {}

  parseData(value: object) {
    //throw new Error('Method not implemented.');
    console.log(Object.values(value)[0]);
    console.log(Object.values(value)[1].country);
    let data: Object = Object.values(value)[0].participations;
    console.log(Object.values(data)[1].year);

    //let i: number = 0;
    //this.country[0].country = Object.values(data)[0].country;
    //
    // this.country[i].country = country;

    // this.participation[i].id = participation[0].id;
    // this.participation[i].year = participation[0].id;

    //console.log(this.country);

    // const { country }: string = value;
    //console.log(typeof value);

    //foreach value de l'objet ajouter au model
  }

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
