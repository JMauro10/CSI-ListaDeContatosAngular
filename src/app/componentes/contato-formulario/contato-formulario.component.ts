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

      this.service.deletarContatoById(this.idRemover).subscribe({
        next: () => {
          console.log('Contato removido com sucesso!');
          this.router.navigateByUrl('/lista');
        },
        error: (erro) => {
          console.error('Erro ao remover contato:', erro);
        }
      });




    /*
    this.service.deletarContatoById(this.idRemover);
    this.router.navigateByUrl('/lista');
     */
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

      this.service.incluirContato({
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
    /*
    this.service.incluirContato({id: this.id, nome: this.nome, email: this.email, telefone: this.telefone});
    this.router.navigateByUrl('/lista');
    */
  }
}
