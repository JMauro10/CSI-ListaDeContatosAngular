import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {ButtonDirective} from 'primeng/button';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ContatoService} from '../../services/contato.service';
import {GrupoService} from '../../services/grupo.service';
import {Router, RouterLink} from '@angular/router';
import {Contato} from '../../models/contato';
import {Grupo} from '../../models/grupo';
import {Compromisso} from '../../models/compromisso';
import {CompromissoService} from '../../services/compromisso.service';
import {Dialog} from 'primeng/dialog';
import {Listbox} from 'primeng/listbox';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-compromisso-lista',
  imports: [
    Menubar,
    ButtonDirective,
    TableModule,
    Dialog,
    FormsModule,
    Listbox,
    ReactiveFormsModule,
    DatePicker,
    DatePipe
  ],
  templateUrl: './compromisso-lista.component.html',
  styleUrl: './compromisso-lista.component.css'
})
export class CompromissoListaComponent implements OnInit{

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

  novoCompromisso: Compromisso = {
    id: 0,
    titulo: '',
    descricao: '',
    dataHora: new Date,
    local: '',
    contato: {
      id: 0,
      nome: '',
      email: '',
      telefone: '',
      grupos: []
    }
  };
  listaContatos: Contato[] =[];
  listaGrupos: Grupo[] = [];
  listaCompromissos: Compromisso[] = [];
  form!: FormGroup;
  exibeModalEdicao: boolean = false;

  constructor(private fb: FormBuilder, private contatoService: ContatoService, private grupoService:GrupoService, private router: Router, private compromissoService: CompromissoService) {
    this.contatoService.listarContatos().subscribe(contatos => this.listaContatos = contatos);
    this.grupoService.listarGrupos().subscribe(grupos => this.listaGrupos = grupos);
    this.compromissoService.listarCompromissos().subscribe(compromissos => {
      this.listaCompromissos = (compromissos || []).map(c => ({
        ...c,
        dataHora: new Date(new Date(c.dataHora).getTime() - 3 * 60 * 60 * 1000)
      }));
    });
  }


  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required || null],
      dataHora: ['', Validators.required],
      local: ['', Validators.required],
      contato: [null , Validators.required]
    });
    this.contatoService.listarContatos().subscribe({
      next: contatos => this.listaContatos = contatos,
      error: () => this.listaContatos = []
    });
  }

  editarCompromisso(compromisso: Compromisso) {
    this.form.patchValue({
      id: compromisso.id,
      titulo: compromisso.titulo,
      descricao: compromisso.descricao,
      dataHora: compromisso.dataHora,
      local: compromisso.local,
      contato: compromisso.contato.id
    });
    this.exibeModalEdicao = true; // Abre o dialog
  }

  salvarEdicao() {
    if (this.form.invalid) {
      return;
    }

    // Recupera o valor real do formulário (com todos campos, inclusive desabilitados)
    const dadosContatos = this.form.getRawValue();


    // Ajusta o array de grupos, transformando IDs em objetos { id }
    dadosContatos.contato = { id: dadosContatos.contato };
    console.log('Enviando para API:', dadosContatos);

    this.compromissoService.atualizarCompromisso(dadosContatos).subscribe({
      next: (compromissoAtualizado) => {
        // Atualiza somente o item na lista local
        const idx = this.listaCompromissos.findIndex(g => g.id === compromissoAtualizado.id);
        if (idx !== -1) {
          this.listaCompromissos[idx] = compromissoAtualizado;
          // Caso o Angular não detecte a mudança, force a renderização:
          this.listaCompromissos = [...this.listaCompromissos];
        }
        this.exibeModalEdicao = false;
        alert('Compromisso atualizado com sucesso!');
      },
      error: (erro) => {
        if (erro.status === 409 || erro.status === 500) {
          alert(erro.error?.message || 'Já existe um compromisso com esse título!');
        } else {
          alert('Erro inesperado ao editar compromisso.');
        }
      }
    });
  }

  removerCompromisso(compromisso: Compromisso) {
    if (compromisso.id === undefined) {
      alert("ID do contato não encontrado. Não é possível remover.");
      return;
    }

    if (confirm(`Tem certeza que deseja remover o compromisso "${compromisso.titulo}"?`)) {
      this.compromissoService.deletarCompromissoById(compromisso.id).subscribe({
        next: () => {
          // Remove da lista localmente após sucesso:
          this.listaCompromissos = this.listaCompromissos.filter(g => g.id !== compromisso.id);
          alert('Compromisso removido com sucesso!');
        },
        error: () => {
          alert('Ocorreu um erro ao tentar remover o compromisso.');
        }
      });
    }
  }
}
