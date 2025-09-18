import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuario.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
//import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { UsuariodetailsComponent } from '../usuariodetails/usuariodetails.component';
//import { UsuariodetailsComponent } from '../usuariodetails/usuariodetails.component';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-usuariolist',
  imports: [RouterLink, MdbModalModule, UsuariodetailsComponent, DatePipe],
  templateUrl: './usuariolist.component.html',
  styleUrl: './usuariolist.component.scss',
  standalone: true,
})
export class UsuariolistComponent {
  lista: Usuario[] = [];
  usuarioService = inject(UsuariosService);
  usuarioEdit: Usuario = new Usuario({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    cargo: '',
    dataCriacao: '',
  });
  /****Modal*********************************************** */
  modalService = inject(MdbModalService);
  @ViewChild('modalUsuariosDetalhe') modalUsuariosDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  /*************************************************** */

  constructor() {
    this.findAll();
  }

  findAll() {
    this.usuarioService.findAll().subscribe({
      next: (lista: Usuario[]) => {
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

  deleteById(usuario: Usuario) {
    if (!usuario.id){
      Swal.fire({
        title: 'Usuário sem ID',
    
        icon: 'warning',
      confirmButtonText: 'Fechar',
     
      cancelButtonText: 'Cancelar'
      });
      return;
    } else {
       Swal.fire({
        title: 'Você tem certeza?',
        icon: 'warning',
       
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar',  
       });
    }/*.then((result) => {
     if (result.isConfirmed) {
        //let indice = this.lista.findIndex((c) => {*/

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
        this.usuarioService.delete(usuario.id).subscribe({
          next: () => {
            this.lista = this.lista.filter((c) => c.id !== usuario.id);
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
    this.usuarioEdit = new Usuario({
      id: 0,
      nome: '',
      email: '',
      senha: '',
      cargo: '',
      dataCriacao: '',
    });
    this.modalRef = this.modalService.open(this.modalUsuariosDetalhe);
  }
  editById(usuario: Usuario) {
    this.usuarioEdit = Object.assign({}, usuario); //clonando pra evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalUsuariosDetalhe);
  }
  retornoDetalhes(usuario: Usuario) {
    if(usuario.id > 0) {
        let indice = this.lista.findIndex((c) => c.id === usuario.id);
        this.lista[indice] = usuario;
        Swal.fire({ 
          title: 'Atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
           showConfirmButton: true,
      showDenyButton: true,
        });
    }else {
      this.lista.push(usuario);
      Swal.fire({
        title: 'Cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
         showConfirmButton: true,
      showDenyButton: true,
       
      });

      
    }
     
    this.modalRef.close();
  }
}
