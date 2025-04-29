import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Grupo} from '../models/grupo';
import {Contato} from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url: string = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  listarGrupos(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.url + '/grupos');
  }

  listarGrupoById(id: number): Observable<Grupo>{
    return this.http.get<Grupo>(this.url + '/grupos' + id);
  }

  incluirGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.post<Grupo>(this.url + '/grupos', grupo);
  }

  atualizarGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.put<Grupo>(this.url + '/grupos', grupo);
  }

  deletarGrupoById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/grupos/' + id);
  }

}
