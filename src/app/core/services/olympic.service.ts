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

  constructor(private http: HttpClient) {}

  parseData(value: object) {
    this.country = this.convertObjToCountry(value);
  }

  convertObjToCountry(o: Object): OlympicCountry[] {
    let country: OlympicCountry[] = [];
    for (let i = 0; i < Object.values(o).length; i++) {
      country[i] = new OlympicCountry();
      country[i] = Object.assign(country[i], Object.values(o)[i]);
      country[i].participations = this.convertObjectToParticipations(
        Object.values(o)[i].participations
      );
    }
    return country;
  }

  convertObjectToParticipations(tab: Object[]): Participation[] {
    let participations: Participation[] = [];
    let i = 0;
    for (let part of tab) {
      participations[i] = new Participation();
      participations[i] = Object.assign(participations[i], part);
      i++;
    }
    return participations;
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

  getAllCountry(): OlympicCountry[] {
    return this.country;
  }
}
