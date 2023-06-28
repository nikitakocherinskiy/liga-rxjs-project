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

  getStarWarsCharacters(): Observable<Object> {
    return this.http.get('https://swapi.dev/api/people');
  }
}
