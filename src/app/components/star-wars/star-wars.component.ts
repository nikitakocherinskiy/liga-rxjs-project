import { Component, OnInit } from '@angular/core';
import { SwapiService } from 'src/app/services/swapi.service';

@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.scss'],
})
export class StarWarsComponent implements OnInit {
  characters: string[] = [];

  constructor(private swapiService: SwapiService) {}

  ngOnInit() {
    this.getStarWarsCharacters();
  }

  getStarWarsCharacters() {
    this.swapiService.getStarWarsCharacters().subscribe((response: any) => {
      this.characters = response.results.map((character: any) =>
        character.name.toUpperCase()
      );
    });
  }
}
