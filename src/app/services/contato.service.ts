import {Injectable, numberAttribute} from '@angular/core';
import {Contato} from '../models/contato';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  /*
  listaContatos: Contato[] = [];

  adicionar(contato : Contato){
    if(contato.nome.length !== 0 && (contato.email.length !== 0 || contato.telefone.length !== 0) ){
      this.listaContatos.push(contato);
    }else{
      alert('Você tem que inserir o nome, telefone ou email para adicionar o contato!')
    }
   return this.http.post<Contato>(this.url + '/contato', contato);
  }

  remover(id : number){
    this.listaContatos = this.listaContatos.filter(contato =>contato.id !== id)
  }

  filter(parametro: any){

    if(typeof(parametro) === 'number'){
      return this.listaContatos.filter(contato=> contato.id === parametro);
    }else {
      return this.listaContatos.filter(contato => contato.nome === parametro);
    }
  }
 */
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
