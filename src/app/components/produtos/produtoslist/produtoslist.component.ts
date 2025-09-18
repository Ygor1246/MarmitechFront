import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Produto } from '../../../models/produto';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import {MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import { ProdutosdetailsComponent } from "../produtosdetails/produtosdetails.component";

@Component({
  selector: 'app-produtoslist',
  imports: [RouterLink, MdbModalModule, ProdutosdetailsComponent],
  templateUrl: './produtoslist.component.html',
  styleUrl: './produtoslist.component.scss'
})
export class ProdutoslistComponent {
  lista: Produto[] = [];
  produtoEdit: Produto = new Produto(
    { id: 0, 
      nome: '', 
      descricao: '', 
      categoria: '',
      dataCadastro: '', 
      precoUnitario: 0, 
      estoque: 0, 
      sku: '' });

  modalService = inject(MdbModalService);
  @ViewChild('modalProdutoDetalhe') modalProdutoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.lista.push(new Produto({
      id: 1,
      nome: 'Produto 1',
      descricao: 'Descrição do Produto 1',
      categoria: 'Categoria A',
      dataCadastro: '2023-10-01',
      precoUnitario: 100.00,
      estoque: 50,
      sku: 'SKU001'
    }));

    this.lista.push(new Produto({
      id: 2,
      nome: 'Produto 2',
      descricao: 'Descrição do Produto 2',
      categoria: 'Categoria B',
      dataCadastro: '2023-10-05',
      precoUnitario: 150.00,
      estoque: 30,
      sku: 'SKU002'
    }));

    this.lista.push(new Produto({
      id: 3,
      nome: 'Produto 3',
      descricao: 'Descrição do Produto 3',
      categoria: 'Categoria A',
      dataCadastro: '2023-10-10',
      precoUnitario: 200.00,
      estoque: 20,
      sku: 'SKU003'
    }));

    history.state.produtoNovo && this.lista.push(history.state.produtoNovo);
    history.state.produtoEditado && (this.lista = this.lista.map(p => p.id === history.state.produtoEditado.id ? history.state.produtoEditado : p));

  }

  editById(produto: Produto) {
    this.produtoEdit = Object.assign({}, produto);
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }

  new() {
    this.produtoEdit = new Produto(
      { id: 0, 
        nome: '', 
        descricao: '', 
        categoria: '',
        dataCadastro: '', 
        precoUnitario: 0, 
        estoque: 0, 
        sku: '' });
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }


  retornoDetalhe(produto: Produto) {
    if(produto.id) {
      this.lista = this.lista.map(p => p.id === produto.id ? produto : p);
    } else {
      produto.id = this.lista.length + 1;
      this.lista.push(produto);
    }
    this.modalRef.close();    
  }


  deleteById(produto: Produto) {
    Swal.fire({
      title: 'Confirma a exclusão do produto ' + produto.nome + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lista = this.lista.filter(p => p.id !== produto.id);
        Swal.fire(
          'Excluído!',
          'Produto ' + produto.nome + ' excluído com sucesso.',
          'success'
        );
      }
    });
  }
}
