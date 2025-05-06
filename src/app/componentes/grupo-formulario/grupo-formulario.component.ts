import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {Panel} from "primeng/panel";
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {GrupoService} from '../../services/grupo.service';
import {ContatoService} from '../../services/contato.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-grupo-formulario',
  imports: [
    Button,
    FloatLabel,
    FormsModule,
    Panel,
    Menubar
  ],
    templateUrl: './grupo-formulario.component.html',
    styleUrl: './grupo-formulario.component.css'
})
export class GrupoFormularioComponent {

  id: number = 0;
  nome: string = '';



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


  constructor(private grupoService: GrupoService, private router : Router, private contatoService: ContatoService) {
  }

  adicionar(){
    if(!this.nome.trim()){
      alert('O nome é obrigatório!');
      return;

    }
    console.log('Dados do formulário antes do envio:', {nome: this.nome,});

    this.grupoService.incluirGrupo({ nome: this.nome}).subscribe({

      next: (grupo) => {
        console.log('Grupo criado com sucesso!');
        this.router.navigateByUrl('/grupo-lista');
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um grupo com esse nome!');
        } else {
          alert('Erro inesperado ao criar grupo.');
        }
      }
    });

  }

}
