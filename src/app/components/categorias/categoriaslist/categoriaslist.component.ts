import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoriasdetailsComponent } from '../categoriasdetails/categoriasdetails.component';
import { CategoriasService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoriaslist',
  imports: [RouterLink, MdbModalModule, CategoriasdetailsComponent],
  templateUrl: './categoriaslist.component.html',
  styleUrls: ['./categoriaslist.component.scss'],
})
export class CategoriaslistComponent {
  lista: Categoria[] = [];
  cateService = inject(CategoriasService);
  
  categoriaEdit: Categoria = new Categoria(
    { id: 0, nome: '', descricao: '' }
  );

  modalService = inject(MdbModalService);
  @ViewChild('modalCategoriaDetalhe') modalCategoriaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    // Exemplo inicial de categorias
    this.lista.push(new Categoria({
      id: 1,
      nome: 'Categoria A',
      descricao: 'Descrição da Categoria A'
    }));

    
   let categoriaNovo = history.state.categoriaNovo;
   let categoriaEditada = history.state.categoriaEditada;
    if(categoriaNovo) { 
      this.lista.push(categoriaNovo);
  }
  if(categoriaEditada) {
    this.lista = this.lista.map(c => c.id === categoriaEditada.id ? categoriaEditada : c);
  }
  }
findAll() {
    this.cateService.findAll().subscribe({
      next: (lista: Categoria[]) => {
        console.log(lista);
        this.lista = lista;
      },
      error: (err) => {
        Swal.fire({
          title: 'Erro ao carregar lista de usuários',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      },
    });
  }

  deleteById(categoria: Categoria) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //let indice = this.lista.findIndex((c) => {
        this.cateService.delete(categoria.id).subscribe({
          next: () => {
            this.lista = this.lista.filter((c) => c.id !== categoria.id);
          },
          error: (err) => {
            Swal.fire({
              title: 'Erro ao deletar usuário',
              text: err.message,
              icon: 'error',
              confirmButtonText: 'Fechar',
            });
          },
        });
        //this.lista.splice(indice, 1);
        Swal.fire({
          title: 'Deletado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  }
  new() {
    this.categoriaEdit = new Categoria({
      id: 0,
      nome: '',
      descricao: '',
    });
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }
  editById(categoria: Categoria) {
    this.categoriaEdit = Object.assign({}, categoria); //clonando pra evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }
  retornoDetalhes(categoria: Categoria) {
    /*  if(usuario > 0) {
        let indice = this.lista.findIndex((c =>{ return c.id === usuario.id});
        this.lista[indice] = usuario;
    }
     */
    this.modalRef.close();
  }
}
