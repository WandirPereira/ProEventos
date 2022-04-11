import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { Evento } from '../models/Evento';

@Injectable(
  // {
  //   providedIn: 'root'  //opção para injeção de dependência no EventoService
  // }
)
export class EventoService {
  baseURL = 'https://localhost:5001/api/eventos';
  constructor(private http: HttpClient) { }

  public getEventos() : Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseURL).pipe(take(1));
  }

  public getEventosByTema(tema: string) : Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}/`).pipe(take(1));
  }

  public getEventoById(id: number) : Observable<Evento>{
    return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public postEvento(evento: Evento) : Observable<Evento>{
    return this.http.post<Evento>(this.baseURL, evento).pipe(take(1));
  }
  // public post(evento: Evento) : Observable<Evento>{
  //   return this.http.post<Evento>(this.baseURL, evento);
  // }

  public putEvento(id: number, evento: Evento) : Observable<Evento>{
    return this.http.put<Evento>(`${this.baseURL}/${id}`, evento).pipe(take(1));
  }
  // public put(evento: Evento) : Observable<Evento>{
  //   return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
  // }

  public deleteEvento(id: number) : Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }
}

