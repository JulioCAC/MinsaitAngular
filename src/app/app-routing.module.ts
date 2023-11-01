import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { CadastrarProdutosComponent } from './pages/cadastrar-produtos/cadastrar-produtos.component';
import { EditarProdutosComponent } from './pages/editar-produtos/editar-produtos.component';


const routes: Routes = [
  {
    path: "", component: InicioComponent
  },
  {
    path: "produtos", component: ProdutosComponent
  },
  {
    path: "produtos/cadastrar", component: CadastrarProdutosComponent 
  },
  {
    path: "produtos/editar", component: EditarProdutosComponent 
  },
  { 
    path: 'editar-produtos/:id', component: EditarProdutosComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
