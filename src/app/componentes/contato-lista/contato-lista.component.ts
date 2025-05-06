import { Component } from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {ContatoService} from '../../services/contato.service';
import {Router, RouterLink} from '@angular/router';
import {Contato} from '../../models/contato';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {GrupoService} from '../../services/grupo.service';
import {TableModule} from 'primeng/table';
import {ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Grupo} from '../../models/grupo';
import {Listbox} from 'primeng/listbox';
import {Tooltip} from 'primeng/tooltip';
import {Checkbox} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';

@Component({
    selector: 'app-contato-detalhes',
  imports: [
    NgForOf,
    NgIf,
    Menubar,
    TableModule,
    ButtonDirective,
    Dialog,
    ReactiveFormsModule,
    Listbox,
    NgStyle,
    Tooltip,
    DropdownModule,
    FormsModule
  ],
    templateUrl: './contato-lista.component.html',
    styleUrl: './contato-lista.component.css'
})
export class ContatoDetalhesComponent {

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


  listaContatos: Contato[] =[];
  form!: FormGroup;
  exibeModalEdicao: boolean = false;
  listaGrupos: Grupo[] = [];
  somenteFavoritos: boolean = false;
  grupoSelecionado: number | null = null;
  termoBusca: String = '';

  constructor(private fb: FormBuilder, private contatoService: ContatoService, private grupoService:GrupoService, private router: Router) {
    this.contatoService.listarContatos().subscribe(contatos => this.listaContatos = contatos);
    this.grupoService.listarGrupos().subscribe(grupos => this.listaGrupos = grupos);
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', Validators.required || null],
      telefone: ['', Validators.required || null],
      grupos: [[]]
    });
    this.grupoService.listarGrupos().subscribe({
      next: grupos => this.listaGrupos = grupos,
      error: () => this.listaGrupos = []
    });
  }
  editarContato(contato: Contato) {
    this.form.patchValue({
      id: contato.id,
      nome: contato.nome,
      email: contato.email,
      telefone: contato.telefone,
      // Se contato.grupos é um array de objetos Grupo:
      grupos: contato.grupos.map(g => g.id)
      // ou, se já é de IDs:
      // grupos: contato.grupos
    });
    this.exibeModalEdicao = true; // Abre o dialog
  }

  salvarEdicao() {
    if (this.form.invalid) {
      return;
    }

    // Recupera o valor real do formulário (com todos campos, inclusive desabilitados)
    const dadosGrupos = this.form.getRawValue();
    // Ajusta o array de grupos, transformando IDs em objetos { id }
    dadosGrupos.grupos = dadosGrupos.grupos.map((id: number) => ({ id }));
    console.log('Enviando para API:', dadosGrupos);

    this.contatoService.atualizarContato(dadosGrupos).subscribe({
      next: (contatoAtualizado) => {
        // Atualiza somente o item na lista local
        const idx = this.listaContatos.findIndex(g => g.id === contatoAtualizado.id);
        if (idx !== -1) {
          this.listaContatos[idx] = contatoAtualizado;
          // Caso o Angular não detecte a mudança, force a renderização:
          this.listaContatos = [...this.listaContatos];
        }
        this.exibeModalEdicao = false;
        alert('Contato atualizado com sucesso!');
      },
      error: (erro) => {
        if (erro.status === 409 || erro.status === 500) {
          alert(erro.error?.message || 'Já existe um contato com esse nome!');
        } else {
          alert('Erro inesperado ao editar contato.');
        }
      }
    });
  }


  removerContato(contato: Contato) {
    if (contato.id === undefined) {
      alert("ID do contato não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o contato "${contato.nome}"?`)) {
      this.contatoService.deletarContatoById(contato.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaContatos = this.listaContatos.filter(g => g.id !== contato.id);
          alert('Contato removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o contato.');
        }
      });
    }
  }

  alternarSomenteFavoritos() {
    this.somenteFavoritos = !this.somenteFavoritos;
  }


    alternarFavorito(contato: Contato) {
      if (contato.id === undefined) {
        alert("Contato sem ID válido!");
        return;
      }
      // Altera o estado localmente para feedback imediato (opcional)
      contato.favorito = !contato.favorito;

      // Chame o backend para atualizar o status
      this.contatoService.atualizarFavorito(contato.id, contato.favorito).subscribe({
        next: () => {
          // Sucesso: pode exibir um toast ou apenas atualizar o visual
        },
        error: () => {
          // Se der erro, reverta o estado e avise o usuário
          contato.favorito = !contato.favorito;
          alert('Erro ao atualizar favorito.');
        }
      });
    }

  get contatosFiltrados(): Contato[] {
    return this.listaContatos
      .filter(contato =>
        !this.somenteFavoritos || contato.favorito
      )
      .filter(contato =>
        !this.grupoSelecionado || contato.grupos.some(g => g.id === this.grupoSelecionado)
      )
      .filter(contato =>
        !this.termoBusca ||
        [contato.nome, contato.email, contato.telefone]
          .some(valor => valor && valor.toLowerCase().includes(this.termoBusca.toLowerCase()))
      );
  }
}
