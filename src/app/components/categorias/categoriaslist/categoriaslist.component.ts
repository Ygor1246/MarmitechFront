import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoriasdetailsComponent } from '../categoriasdetails/categoriasdetails.component';

@Component({
  selector: 'app-categoriaslist',
  imports: [RouterLink, MdbModalModule, CategoriasdetailsComponent],
  templateUrl: './categoriaslist.component.html',
  styleUrls: ['./categoriaslist.component.scss'],
})
export class CategoriaslistComponent {
  lista: Categoria[] = [];
  categoriaEdit: Categoria = new Categoria(0, '', '');

  modalService = inject(MdbModalService);
  @ViewChild('modalCategoriaDetalhe') modalCategoriaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    // Exemplo inicial de categorias
    this.lista.push(new Categoria(1, 'Categoria A', 'Descrição da Categoria A'));
    this.lista.push(new Categoria(2, 'Categoria B', 'Descrição da Categoria B'));
    this.lista.push(new Categoria(3, 'Categoria C', 'Descrição da Categoria C'));

    // Se veio alguma categoria pelo history.state (ex: após cadastro/edição)
    history.state.categoriaNova && this.lista.push(history.state.categoriaNova);
    history.state.categoriaEditada && 
      (this.lista = this.lista.map(c => c.id === history.state.categoriaEditada.id ? history.state.categoriaEditada : c));
  }

  editById(categoria: Categoria) {
    this.categoriaEdit = Object.assign({}, categoria);
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }

  new() {
    this.categoriaEdit = new Categoria(0, '', '');
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }

  retornoDetalhe(categoria: Categoria) {
    if (categoria.id) {
      this.lista = this.lista.map(c => c.id === categoria.id ? categoria : c);
    } else {
      categoria.id = this.lista.length + 1;
      this.lista.push(categoria);
    }
    this.modalRef.close();
  }

  deleteById(categoria: Categoria) {
    Swal.fire({
      title: 'Confirma a exclusão da categoria ' + categoria.nome + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.lista = this.lista.filter(c => c.id !== categoria.id);
        Swal.fire(
          'Excluído!',
          'Categoria ' + categoria.nome + ' excluída com sucesso.',
          'success'
        );
      }
    });
  }
}
