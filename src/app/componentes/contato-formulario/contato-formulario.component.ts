import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ContatoService} from '../../services/contato.service';
import {Router} from '@angular/router';
import {Grupo} from '../../models/grupo';
import {GrupoService} from '../../services/grupo.service';
import {Panel} from 'primeng/panel';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Contato} from '../../models/contato';
import {Listbox} from 'primeng/listbox';




@Component({
    selector: 'app-contato-formulario',
  imports: [
    FormsModule, CommonModule, Panel, FloatLabel, Button, Menubar, Listbox
  ],
    templateUrl: './contato-formulario.component.html',
    styleUrl: './contato-formulario.component.css'
})
export class ContatoFormularioComponent {

  items: MenuItem[] = [
    {
      label: 'Novo Contato',
      routerLink: '/contato-formulario'
    },
    {
      label: 'Contatos',
      routerLink: '/contato-lista'
    },
    {
      label: 'Novo Grupo',
      routerLink: '/grupo-formulario'
    },
    {
      label: 'Grupos',
      routerLink: '/grupo-lista'
    },
    {
      label: 'Novo Compromisso',
      routerLink: '/compromisso-formulario'
    },
    {
      label: 'Compromissos',
      routerLink: '/compromisso-lista'
    }
  ];



  novoContato: Contato = {id: 0, nome: '', email: '', telefone: '', grupos: []};
  listaGrupos: Grupo[] = [];


  constructor(private contatoService : ContatoService, private router : Router, private grupoService : GrupoService) {
    this.grupoService.listarGrupos().subscribe(grupos => this.listaGrupos = grupos);
  }

  adicionar(){
      if(!this.novoContato.nome.trim()){
        alert('O nome é obrigatório!');
        return;
      }
      if (!this.novoContato.email.trim() && !this.novoContato.telefone.trim()){
        alert('Insira ao menos um dos dois: email ou telefone!')
      }
      console.log('Dados do formulário antes do envio:', this.novoContato);

      this.contatoService.incluirContato(this.novoContato).subscribe({
        next: (contato) => {
          console.log('Contato criado com sucesso!');
          this.router.navigateByUrl('/contato-lista');
        },
        error: (erro) => {
          if (erro.status === 400 || erro.status === 409) {
            alert(erro.error?.message || 'Já existe um contato com esse nome!');
          } else {
            alert('Erro inesperado ao criar contato.');
          }
        }
      });

  }

}
