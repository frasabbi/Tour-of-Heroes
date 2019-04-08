import { Injectable } from '@angular/core';
import { Hero } from '../heroes';
import { Observable , of, observable } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { catchError,map,tap } from "rxjs/operators";


const httpOptions={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn:'root'
})
export class HeroService {

 

  private heroesUrl='api/heroes';
  constructor(
    private http:HttpClient,
    private messageService:MessageService,
  ) { }

  getHeroes():Observable<Hero[]>{//ritorna in maniera asincrona tutti gli eroi (in maniera asincrona vuol dire che quando il client manda la richiesta il server,
    return this.http.get<Hero[]>(this.heroesUrl)
               .pipe(
                 tap(_=>this.log('fetched Heroes')),
                 catchError(this.handleError<Hero[]>( 'getHeroes', [] ))
               )
  }
  /*getHeroById(id:number):Observable<Hero>{ Questo metodo asincrono ritorna l'eroe che gli viene passato tramite id
    this.messageService.add(`HeroService: fetched hero detail with id=${id}`) bisogna usare l'accento grave per far si che tramite il dollaro e le parentesi graffe quando inserisco l'id prenda il valore dell'id e me lo fa visualizzare a video
    return of(MOCKS.find(hero=>hero.id===id));
  }*/
  getHeroById(id: number):Observable<Hero>{
    const url =`${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
               .pipe(
                 tap(_=>this.log(`fetched Heroes with id =${id}`)),
                 catchError(this.handleError<Hero>( `getHero by id ${id}` ))
               );
  }
  updateHero(hero: Hero) {//ogni metodo posto dopo http tipo this.http.put sono i tipi di servizi che utilizziamo per trattare quel tipo di dato
    return this.http.put(this.heroesUrl,hero,httpOptions).pipe( //usiamo il metodo put per modificare l'eroe, questometodo prende in pasto tre cose:-l'url;-il dato da modificare;-e le options 
      tap(_=>this.log(`updated hero with the id: ${hero.id}`)),
      catchError(this.handleError<any>(`updated hero`))
    )
  }
  addHero(hero : Hero):Observable<Hero>{
    return this.http.post(this.heroesUrl,hero,httpOptions).pipe(
      tap((newHero:Hero)=>this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  } 
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHero(term:string):Observable<Hero[]>{
    if(!term.trim){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  private log(message:string){
    this.messageService.add(`Heroes: ${message}`)
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      console.error(error); // log to console instead
   
      this.log(`${operation} failed: ${error.message}`);
   
      return of(result as T);
    };
  }

}