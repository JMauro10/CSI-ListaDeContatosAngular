import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Contato} from '../../models/contato';
import {ContatoService} from '../../services/contato.service';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {Grupo} from '../../models/grupo';
import {GrupoService} from '../../services/grupo.service';

@Component({
    selector: 'app-contato-lista',
    imports: [
        RouterLink,
        NgIf,
        NgForOf,
        JsonPipe
    ],
    templateUrl: './contato-lista.component.html',
    styleUrl: './contato-lista.component.css'
})
export class ContatoListaComponent {

  listaContatos: Contato[] =[];
  grupos: Grupo[] = [];
  contatos: Contato[] = [];
  selectedGrupoId: number | undefined;

  constructor(private service: ContatoService, private router: Router, private grupoService: GrupoService) {
    this.service.listarContatos().subscribe(contatos => this.listaContatos = contatos);
  }

}
