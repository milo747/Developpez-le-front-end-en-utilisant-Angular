import { Participation } from './Participation.model';

export class OlympicCountry {
  constructor(
    public id: number = 0,
    public country: string = '',
    public participations: Participation[] = []
  ) {}
}
