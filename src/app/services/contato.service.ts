import {Injectable, numberAttribute} from '@angular/core';
import {Contato} from '../models/contato';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  incluirContato(contato: Contato): Observable<Contato>{
    return this.http.post<Contato>(this.url + '/contato', contato);
  }

  listarContatos():Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url + '/contato');
  }

  listarContatoById(id : number): Observable<Contato>{
    return this.http.get<Contato>(this.url + '/contato/' + id);
  }

  deletarContatoById(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/contato/' + id);
  }

  atualizarContato(contato: Contato): Observable<Contato>{
    return this.http.put<Contato>(this.url + '/contato', contato);
  }
}
