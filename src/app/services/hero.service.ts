import { Injectable } from '@angular/core';
import { MOCKS } from "../mock-heroes";
import { Hero } from '../heroes';
import { Observable , of } from "rxjs";
import { MessageService } from "./message.service";
@Injectable({
  providedIn:'root'
})
export class HeroService {

  constructor(
    private messageService:MessageService,
  ) { }

  getHeroes():Observable<Hero[]>{//ritorna in maniera asincrona tutti gli eroi (in maniera asincrona vuol dire che quando il client manda la richiesta il server,
    this.messageService.add("HeroService: fetched heroes")//che sia mock o reale, riceve la richiesta e non si ferma a elaborarla freezando il sito ma bensì il client può comunque fare qualcosa sul sito mentre il server elabora la richiesta e ritorna il valore
    return of(MOCKS);
  }
  getHeroById(id:number):Observable<Hero>{//Questo metodo asincrono ritorna l'eroe che gli viene passato tramite id
    this.messageService.add(`HeroService: fetched hero detail with id=${id}`) //bisogna usare l'accento grave per far si che tramite il dollaro e le parentesi graffe quando inserisco l'id prenda il valore dell'id e me lo fa visualizzare a video
    return of(MOCKS.find(hero=>hero.id===id));
  }
}
