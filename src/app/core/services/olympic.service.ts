import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);
  public countries = this.olympics$.asObservable();
  // private data: Observable<any> = new Observable<any>();
  // private content: any;
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).subscribe((countries) => {
      this.olympics$.next(countries);
    });
  }

  // loadInitialData() {
  //   return this.http.get<Country[]>(this.olympicUrl).subscribe((countries) => {
  //     this.olympics$.next(countries);
  //   });
  // }

  // loadInitialData() {
  //   this.data = this.http.get<any>(this.olympicUrl);
  //   // .pipe(tap((value) => (this.data = value)));
  //   this.data.subscribe((value) => this.contentLoaded(value));
  //   //this.olympics$.next(this.data);
  //   console.log(this.data);
  //   console.log(this.content);
  //   //console.log(this.content);
  //   return this.olympics$;
  // }

  // contentLoaded(content: any) {
  //   console.log(content);
  // }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getCountry(id: string | number) {
    // return this.olympics$.subscribe((value) => value[id]);
  }
}
