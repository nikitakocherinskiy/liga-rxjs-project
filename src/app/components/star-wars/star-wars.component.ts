import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwapiService } from 'src/app/services/swapi.service';
import { switchMap, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.scss'],
})
export class StarWarsComponent implements OnInit, OnDestroy {
  characters: string[] = [];
  filteredCharacters: string[] = [];
  lowercaseCharacters: string[] = [];
  CharactersWithBlueEyes: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit() {
    this.getStarWarsCharacters();
    this.subscribeToFilteredCharacters();
    this.subscribeToLowercaseCharacters();
    this.subscribeToCharactersWithBlueEyes();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getStarWarsCharacters() {
    this.swapiService.getStarWarsCharacters().subscribe((response: any) => {
      this.characters = response.results.map(
        (character: any) => character.name
      );
    });
  }

  subscribeToFilteredCharacters() {
    const filteredCharactersChain = this.swapiService
      .getStarWarsCharacters()
      .pipe(
        switchMap((response: any) => response.results),
        map((character: any) => character.name),
        filter((name: string) => name.startsWith('L'))
      );

    const subscription = filteredCharactersChain.subscribe((name: string) => {
      this.filteredCharacters.push(name);
    });
    this.subscriptions.push(subscription);
  }

  subscribeToLowercaseCharacters() {
    const lowercaseCharactersChain = this.swapiService
      .getStarWarsCharacters()
      .pipe(
        switchMap((response: any) => response.results),
        map((character: any) => character.name.toLowerCase())
      );

    const subscription = lowercaseCharactersChain.subscribe((name: string) => {
      this.lowercaseCharacters.push(name);
    });
    this.subscriptions.push(subscription);
  }

  subscribeToCharactersWithBlueEyes() {
    const CharactersWithBlueEyesChain = this.swapiService
      .getStarWarsCharacters()
      .pipe(
        switchMap((response: any) => response.results),
        filter((character: any) => character.eye_color.includes('blue')),
        map((character: any) => character.name)
      );

    const subscription = CharactersWithBlueEyesChain.subscribe(
      (name: string) => {
        this.CharactersWithBlueEyes.push(name);
      }
    );
    this.subscriptions.push(subscription);
  }
}
