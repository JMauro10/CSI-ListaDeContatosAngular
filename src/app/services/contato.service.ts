import {Injectable, numberAttribute} from '@angular/core';
import {Contato} from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  listaContatos: Contato[] = [];

  adicionar(contato : Contato){
    if(contato.nome.length !== 0 && (contato.email.length !== 0 || contato.telefone.length !== 0) ){
      this.listaContatos.push(contato);
    }else{
      alert('Você tem que inserir o nome, telefone e email para adicionar o contato!')
    }

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


  constructor() {
  }
}
