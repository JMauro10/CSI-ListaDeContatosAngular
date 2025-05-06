import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Compromisso} from '../models/compromisso';


@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  incluirCompromisso(compromisso: Compromisso): Observable<Compromisso>{
    return this.http.post<Compromisso>(this.url + '/compromisso', compromisso);
  }

  listarCompromissos():Observable<Compromisso[]>{
    return this.http.get<Compromisso[]>(this.url + '/compromisso');
  }

  deletarCompromissoById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/compromisso/' + id);
  }

  atualizarCompromisso(compromisso: Compromisso): Observable<Compromisso>{
    return this.http.put<Compromisso>(this.url + '/compromisso', compromisso);
  }

}
