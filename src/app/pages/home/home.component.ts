import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<string | null> = of(null);
  public country: OlympicCountry[];
  public test: string = 'toto';
  constructor(private olympicService: OlympicService) {
    this.country = [];
  }

  ngOnInit(): void {
    console.log(this.country);
    this.country = this.olympicService.getAllCountry();
    console.log(this.country);
    this.olympics$ = this.olympicService.getOlympics();
    //console.log(this.olympics$.subscribe((value) => console.log(value)));
    /*this.olympics$.subscribe((value) => {
      console.log(value);
    });*/
  }
}
