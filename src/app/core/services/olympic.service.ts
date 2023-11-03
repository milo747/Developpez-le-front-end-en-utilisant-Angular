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
    /*
    //throw new Error('Method not implemented.');
    console.log(Object.values(value)[0]);
    console.log(Object.values(value)[1].country);
    let data: Object = Object.values(value)[0].participations;
    console.log(Object.values(data)[1].year);

    let myobjectCtry: OlympicCountry = new OlympicCountry(
      Object.values(value)[1].id,
      Object.values(value)[1].country,
      this.convertObjectToParticiptions(Object.values(value)[1].participations)
    );

    console.log(myobjectCtry);
*/

    //console.log('$$$$$$$$$$$');
    //console.log(value[1]);
    console.log(this.convertObjToCountry(value));

    //console.log('ooooooooooo');

    //this.convertObjectToParticiptions(Object.values(value)[0].participations);
    /*
    let o3 = Object.values(value)[0].participations[0];
    let o4: Participation = new Participation(0, 0, '', 0, 0);
    console.log('$$$$$$$$$$$');
    console.log(Object.assign(o4, o3));
    let o1 = Object.values(value)[0];
    let o2: OlympicCountry = new OlympicCountry(0, '');

    console.log(Object.assign(o2, o1));
*/
    /*
    let olco: OlympicCountry;
    let res = OlympicCountry;
    res = Object.assign(OlympicCountry, Object.values(value)[0]);
    console.log(res);
    let i: number = 0;
 */
    /*  for (const element of Object.values(value)) {
      console.log(element);
      this.country[i].id = Object.values(element)[0].id;
      //this.country[i].country = Object.values(element)[0].country;
    }
*/
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

  convertObjToCountry(o: Object): OlympicCountry[] {
    let country: OlympicCountry[] = [];

    //console.log('mmmmmmmmmmmmm');
    //console.log(Object.values(o)[2]);
    //console.log('mmmmmmmmmmmmm');
    for (let i = 0; i < Object.values(o).length; i++) {
      country[i] = new OlympicCountry();
      country[i] = Object.assign(country[i], Object.values(o)[i]);
    }

    /*
    console.log('mmmmmmmmmmmmm');
    console.log(Object.values(o)[3]);
    console.log('mmmmmmmmmmmmm');

    for (let i = 0; i < Object.values(o).length; i++)
      country.participations = this.convertObjectToParticiptions(
        Object.values(o)[i].participations
      );
*/
    return country;
  }

  convertObjectToParticiptions(tab: Object[]): Participation[] {
    let participations: Participation[] = [];

    console.log(tab);
    let i = 0;
    for (let part of tab) {
      participations[i] = new Participation();
      participations[i] = Object.assign(participations[i], part);
      i++;
    }
    console.log(participations);
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
}
