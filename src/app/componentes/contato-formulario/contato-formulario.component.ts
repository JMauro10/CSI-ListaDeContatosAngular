import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ContatoService} from '../../services/contato.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contato-formulario',
  standalone: true,
  imports: [
    RouterLink, FormsModule, CommonModule
  ],
  templateUrl: './contato-formulario.component.html',
  styleUrl: './contato-formulario.component.css'
})
export class ContatoFormularioComponent {
  id: number = 0 ;
  idRemover : number = 0;
  nome: string = '';
  email: string = '';
  telefone: string = '';



  constructor(private service : ContatoService, private router : Router) {
  }
  remover(){
    this.service.remover(this.idRemover);
    this.router.navigateByUrl('/lista');
  }
  adicionar(){
    this.service.adicionar({id: this.id, nome: this.nome, email: this.email, telefone: this.telefone});
    this.router.navigateByUrl('/lista');
  }
}
