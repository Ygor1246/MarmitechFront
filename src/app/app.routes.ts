import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';

import { ProdutoslistComponent } from './components/produtos/produtoslist/produtoslist.component';
import { ProdutosdetailsComponent } from './components/produtos/produtosdetails/produtosdetails.component';

import { CategoriaslistComponent } from './components/categorias/categoriaslist/categoriaslist.component';
import { CategoriasdetailsComponent } from './components/categorias/categoriasdetails/categoriasdetails.component';

import { PedidoslistComponent } from './components/pedidos/pedidoslist/pedidoslist.component';
import { PedidosdetailsComponent } from './components/pedidos/pedidosdetails/pedidosdetails.component';
import { PedidosItemlistComponent } from './components/pedidosItem/pedidos-itemlist/pedidos-itemlist.component';

import { UsuariolistComponent } from './components/usuario/usuariolist/usuariolist.component';
import { UsuariodetailsComponent } from './components/usuario/usuariodetails/usuariodetails.component';

import { HistoricolistComponent } from './components/historico/historicolist/historicolist.component';
import { HistoricodetailsComponent } from './components/historico/historicodetails/historicodetails.component';

import { ClientelistComponent } from './components/cliente/clientelist/clientelist.component';
import { ClientedetailsComponent } from './components/cliente/clientedetails/clientedetails.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: PrincipalComponent,
    children: [
      { path: 'produtos', component: ProdutoslistComponent },
      { path: 'produtos/new', component: ProdutosdetailsComponent },
      { path: 'produtos/edit/:id', component: ProdutosdetailsComponent },

      { path: 'pedidos', component: PedidoslistComponent },
      { path: 'pedidos/new', component: PedidosdetailsComponent },
      { path: 'pedidos/edit/:id', component: PedidosdetailsComponent },
      { path: 'pedidosItem', component: PedidosItemlistComponent },

      { path: 'categorias', component: CategoriaslistComponent },
      { path: 'categorias/new', component: CategoriasdetailsComponent },
      { path: 'categorias/edit/:id', component: CategoriasdetailsComponent },

      { path: 'usuarios', component: UsuariolistComponent },
      { path: 'usuarios/new', component: UsuariodetailsComponent },
      { path: 'usuarios/edit/:id', component: UsuariodetailsComponent },

      { path: 'historico', component: HistoricolistComponent },
      { path: 'historico/new', component: HistoricodetailsComponent },
      { path: 'historico/edit/:id', component: HistoricodetailsComponent },

      { path: 'cliente', component: ClientelistComponent },
      { path: 'cliente/new', component: ClientedetailsComponent },
      { path: 'cliente/edit/:id', component: ClientedetailsComponent },
    ],
  },
];
