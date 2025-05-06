import { Component } from '@angular/core';
import {Menubar} from "primeng/menubar";
import {MenuItem} from 'primeng/api';
import {ContatoService} from '../../services/contato.service';
import {GrupoService} from '../../services/grupo.service';
import {Router} from '@angular/router';
import {Grupo} from '../../models/grupo';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';

@Component({
    selector: 'app-grupo-lista',
  imports: [
    Menubar,
    TableModule,
    ButtonDirective,
    Dialog,
    ReactiveFormsModule
  ],
    templateUrl: './grupo-lista.component.html',
    styleUrl: './grupo-lista.component.css'
})
export class GrupoListaComponent {

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




  listaGrupos: Grupo[] =[];
  exibeModalEdicao: boolean = false;
  form!: FormGroup;


  constructor(private fb: FormBuilder, private service: ContatoService, private grupoService:GrupoService, private router: Router) {
    this.grupoService.listarGrupos().subscribe(grupos => this.listaGrupos = grupos);
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required]
    });
  }
  editarGrupo(grupo: Grupo) {
    this.form.patchValue({
      id: grupo.id,
      nome: grupo.nome
    });
    this.exibeModalEdicao = true; // Abre o dialog
  }

  salvarEdicao() {
    if (this.form.invalid) {
      return;
    }
    const grupoEditado: Grupo = this.form.value;
    this.grupoService.atualizarGrupo(grupoEditado).subscribe({
      next: (grupoAtualizado) => {
        // Atualiza somente o item na lista local
        const idx = this.listaGrupos.findIndex(g => g.id === grupoAtualizado.id);
        if (idx !== -1) {
          this.listaGrupos[idx] = grupoAtualizado;
          // Caso o Angular não detecte a mudança, force a renderização:
          this.listaGrupos = [...this.listaGrupos];
        }
        this.exibeModalEdicao = false;
        alert('Grupo atualizado com sucesso!');
      },
      error: (erro) => {
        if (erro.status === 409) {
          alert(erro.error?.message || 'Já existe um grupo com esse nome!');
        } else {
          alert('Erro inesperado ao editar grupo.');
        }
      }
    });
  }


  removerGrupo(grupo: Grupo) {
    if (grupo.id === undefined) {
      alert("ID do grupo não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o grupo "${grupo.nome}"?`)) {
      this.grupoService.deletarGrupoById(grupo.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaGrupos = this.listaGrupos.filter(g => g.id !== grupo.id);
          alert('Grupo removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o grupo.');
        }
      });
    }
  }
}
