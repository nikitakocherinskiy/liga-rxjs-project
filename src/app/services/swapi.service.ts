import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IChar } from '../models/IChar';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  getStarWarsCharacters(): Observable<IChar[]> {
    return this.http.get<IChar[]>('https://swapi.dev/api/people');
  }
}
