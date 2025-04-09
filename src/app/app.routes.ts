import { Routes } from '@angular/router';
import {ContatoListaComponent} from './componentes/contato-lista/contato-lista.component';
import {ContatoFormularioComponent} from './componentes/contato-formulario/contato-formulario.component';
import {ContatoDetalhesComponent} from './componentes/contato-detalhes/contato-detalhes.component';


export const routes: Routes = [
  {path: 'lista', component: ContatoListaComponent},
  {path: 'addContato', component: ContatoFormularioComponent},
  {path: 'detalhesContato', component: ContatoDetalhesComponent},
  {path: '', redirectTo: '/addContato', pathMatch: 'full'}
];


