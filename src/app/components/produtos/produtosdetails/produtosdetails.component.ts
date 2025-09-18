import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtosdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './produtosdetails.component.html',
  styleUrl: './produtosdetails.component.scss'
})
export class ProdutosdetailsComponent {
  router = inject(ActivatedRoute);
  routerSaver = inject(Router);
  
  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.findById(parseInt(id));
    }
  }
  
  @Input("produto") produto: Produto = new Produto(
    { id: 0, 
      nome: '', 
      descricao: '', 
      categoria: '',
      dataCadastro: '', 
      precoUnitario: 0, 
      estoque: 0, 
      sku: '' });

  @Output("retorno") retorno = new EventEmitter<Produto>();
      
    findById(id: number) {
      let produtoRetornado: Produto = new Produto({
        id: id,
        nome: 'Produto ' + id,
        descricao: 'Descrição do Produto ' + id,
        categoria: 'Categoria A',
        dataCadastro: '2023-10-01',
        precoUnitario: 100.00 * id,
        estoque: 50 - id,
        sku: 'SKU00' + id
      });
      this.produto = produtoRetornado;
    }

    salvar() {
    if(this.produto.id) {
      Swal.fire({
        title: 'Atualizado!',
        icon: 'success',
        confirmButtonText: 'Sim',
      })
      this.routerSaver.navigate(['admin/produtos'], {state: { produtoEditado: this.produto }});
    } else {
      Swal.fire({
        title: 'Cadastrado!',
        icon: 'success',
        confirmButtonText: 'Sim',
      })
      this.routerSaver.navigate(['admin/produtos'], {state: { produtoNovo: this.produto }});
    }

    this.retorno.emit(this.produto);
  }
}
