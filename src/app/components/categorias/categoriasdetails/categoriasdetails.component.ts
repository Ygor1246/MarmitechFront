import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Categoria } from '../../../models/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoriasdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './categoriasdetails.component.html',
  styleUrls: ['./categoriasdetails.component.scss']
})
export class CategoriasdetailsComponent {
  router = inject(ActivatedRoute);
  routerSaver = inject(Router);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.findById(parseInt(id));
    }
  }

  @Input("categoria") categoria: Categoria = new Categoria(
    { id: 0, nome: '', descricao: '' }
  );

 
 
 
 
 
  @Output("retorno") retorno = new EventEmitter<Categoria>();

  findById(id: number) {
    // Simula a busca de uma categoria pelo id
    let categoriaRetornada: Categoria = new Categoria({
      id,
      nome: 'Categoria ' + id,
      descricao: 'Descrição da Categoria ' + id
    });
    this.categoria = categoriaRetornada;
  }

  salvar() {
    if(this.categoria.id) {
      Swal.fire({
        title: 'Atualizado!',
        icon: 'success',
        confirmButtonText: 'Sim',
      });
      this.routerSaver.navigate(['admin/categorias'], { state: { categoriaEditada: this.categoria } });
    } else {
      Swal.fire({
        title: 'Cadastrado!',
        icon: 'success',
        confirmButtonText: 'Sim',
      });
      this.routerSaver.navigate(['admin/categorias'], { state: { categoriaNova: this.categoria } });
    }

    this.retorno.emit(this.categoria);
  }
}
