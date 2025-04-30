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
import {Contato} from '../../models/contato';
import {Listbox} from 'primeng/listbox';


@Component({
    selector: 'app-contato-formulario',
  imports: [
    RouterLink, FormsModule, CommonModule, Panel, FloatLabel, InputMask, Button, Menubar, Listbox
  ],
    templateUrl: './contato-formulario.component.html',
    styleUrl: './contato-formulario.component.css'
})
export class ContatoFormularioComponent {


  idRemover : number = 0;
  novoContato: Contato = {id: 0, nome: '', email: '', telefone: '', grupos: []};

  listaGrupos: Grupo[] = [];


  constructor(private contatoService : ContatoService, private router : Router, private grupoService : GrupoService) {
    this.grupoService.listarGrupos().subscribe(grupos => this.listaGrupos = grupos);
  }
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
    }
  ];

  remover(){

      this.contatoService.deletarContatoById(this.idRemover).subscribe({
        next: () => {
          console.log('Contato removido com sucesso!');
          this.router.navigateByUrl('/contato-lista');
        },
        error: (erro) => {
          console.error('Erro ao remover contato:', erro);
        }
      });


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
          console.log('Contato salvo:', contato);
          this.router.navigateByUrl('/contato-lista');
        },
        error: (erro) => {
          console.error('Erro ao salvar contato:', erro);
        }
      });

  }
}
