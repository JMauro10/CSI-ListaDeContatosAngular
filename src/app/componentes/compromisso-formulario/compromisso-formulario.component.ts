import {Component, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {ContatoService} from '../../services/contato.service';
import {Router} from '@angular/router';
import {GrupoService} from '../../services/grupo.service';
import {Contato} from '../../models/contato';
import {Compromisso} from '../../models/compromisso';
import {CompromissoService} from '../../services/compromisso.service';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {Panel} from 'primeng/panel';
import {DatePicker} from 'primeng/datepicker';
import {Listbox} from 'primeng/listbox';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-compromisso-formulario',
  imports: [
    Menubar,
    FloatLabel,
    FormsModule,
    Panel,
    DatePicker,
    Listbox,
    Button
  ],
  templateUrl: './compromisso-formulario.component.html',
  styleUrl: './compromisso-formulario.component.css'
})
export class CompromissoFormularioComponent implements OnInit{

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

  novoCompromisso: Compromisso = {id: 0, titulo: '', descricao: '', dataHora: new Date(), local: '', contato: {id: 0, nome: '', email: '', telefone: '', grupos: [] }};
  listaContatos: Contato[] = [];

  constructor(private compromissoService: CompromissoService, private contatoService : ContatoService, private router : Router, private grupoService : GrupoService) {
    this.contatoService.listarContatos().subscribe(contatos => this.listaContatos = contatos);
  }

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.contatoService.listarContatos().subscribe({
      next: (contatos) => {
        this.listaContatos = contatos;
      },
      error: (err) => {
        alert('Erro ao carregar contatos!');
        console.error('Detalhes do erro ao carregar contatos:', err);
        this.listaContatos = [];
      }
    });
  }

  adicionar(){
    if(!this.novoCompromisso.titulo.trim()){
      alert('O título é obrigatório!');
      return;
    }
    if (this.novoCompromisso.dataHora < new Date()){
      alert('A data selecionada é menor que a data atual!')
    }
    if(!this.novoCompromisso.local.trim()){
      alert('O local é obrigatório!');
      return;
    }

    if (
      !this.novoCompromisso.contato ||                                     // contato não definido
      !this.novoCompromisso.contato.id ||                                  // contato sem id
      typeof this.novoCompromisso.contato.id !== 'number' || this.novoCompromisso.contato.id === 0 // valor id inválido
    ) {
      alert('Você deve adicionar um contato ao compromisso!');
      return;
    }

    console.log('Dados do formulário antes do envio:', this.novoCompromisso);

    this.compromissoService.incluirCompromisso(this.novoCompromisso).subscribe({
      next: (compromisso) => {
        console.log('Compromisso criado com sucesso!');
        this.router.navigateByUrl('/compromisso-lista');
      },
      error: (erro) => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um compromisso com esse título!');
        } else {
          alert('Erro inesperado ao criar compromisso.');
        }
      }
    });

  }
}
