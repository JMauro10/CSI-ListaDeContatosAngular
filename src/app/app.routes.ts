import { Routes } from '@angular/router';
import {ContatoListaComponent} from './componentes/contato-lista/contato-lista.component';
import {ContatoFormularioComponent} from './componentes/contato-formulario/contato-formulario.component';
import {ContatoDetalhesComponent} from './componentes/contato-detalhes/contato-detalhes.component';
import {GrupoFormularioComponent} from './componentes/grupo-formulario/grupo-formulario.component';
import {GrupoListaComponent} from './componentes/grupo-lista/grupo-lista.component';


export const routes: Routes = [
  {path: 'lista', component: ContatoListaComponent},
  {path: 'addContato', component: ContatoFormularioComponent},
  {path: 'grupo-formulario', component: GrupoFormularioComponent},
  {path: 'grupo-lista', component: GrupoListaComponent},
  {path: 'detalhesContato', component: ContatoDetalhesComponent},
  {path: '', redirectTo: '/addContato', pathMatch: 'full'}
];


