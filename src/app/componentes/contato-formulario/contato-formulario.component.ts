import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ContatoService} from '../../services/contato.service';
import {Router} from '@angular/router';
import {Grupo} from '../../models/grupo';
import {GrupoService} from '../../services/grupo.service';
import {Panel} from 'primeng/panel';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {Button} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';


@Component({
    selector: 'app-contato-formulario',
  imports: [
    RouterLink, FormsModule, CommonModule, Panel, FloatLabel, InputMask, Button, Menubar
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
  grupos: [] = [];

  listaGrupos: Grupo[] = [];


  constructor(private contatoService : ContatoService, private router : Router, private grupoService : GrupoService) {
    this.grupoService.listarGrupos().subscribe(grupos => this.listaGrupos = grupos);
  }
  items: MenuItem[] = [
    {
      label: 'Lista grupos',
      routerLink: '/grupo-lista'
    },
    {
      label: 'Novo Contato',
      routerLink: '/addContato'
    },
    {
      label: 'Sobre',
      routerLink: '/detalhesContato'
    }
  ];

  remover(){

      this.contatoService.deletarContatoById(this.idRemover).subscribe({
        next: () => {
          console.log('Contato removido com sucesso!');
          this.router.navigateByUrl('/lista');
        },
        error: (erro) => {
          console.error('Erro ao remover contato:', erro);
        }
      });


  }
  adicionar(){
      if(!this.nome.trim()){
        alert('O nome é obrigatório!');
        return;
      }
      if (!this.email.trim() && !this.telefone.trim()){
        alert('Insira ao menos um dos dois: email ou telefone!')
      }
      console.log('Dados do formulário antes do envio:', {
        id: this.id,
        nome: this.nome,
        email: this.email,
        telefone: this.telefone
      });

      this.contatoService.incluirContato({
        id: this.id,
        nome: this.nome,
        email: this.email,
        telefone: this.telefone
      }).subscribe({
        next: (contato) => {
          console.log('Contato salvo:', contato);
          this.router.navigateByUrl('/lista');
        },
        error: (erro) => {
          console.error('Erro ao salvar contato:', erro);
        }
      });

  }
}
