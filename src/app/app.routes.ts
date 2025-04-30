import { Routes } from '@angular/router';
import {ContatoFormularioComponent} from './componentes/contato-formulario/contato-formulario.component';
import {ContatoDetalhesComponent} from './componentes/contato-lista/contato-lista.component';
import {GrupoFormularioComponent} from './componentes/grupo-formulario/grupo-formulario.component';
import {GrupoListaComponent} from './componentes/grupo-lista/grupo-lista.component';


export const routes: Routes = [
  {path: 'contato-formulario', component: ContatoFormularioComponent},
  {path: 'contato-lista', component: ContatoDetalhesComponent},
  {path: 'grupo-formulario', component: GrupoFormularioComponent},
  {path: 'grupo-lista', component: GrupoListaComponent},
  {path: '', redirectTo: '/contato-formulario', pathMatch: 'full'}
];


