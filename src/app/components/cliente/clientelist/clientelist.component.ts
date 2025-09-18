import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ClientedetailsComponent } from '../clientedetails/clientedetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-clientelist',
  imports: [RouterLink, MdbModalModule, ClientedetailsComponent, DatePipe],
  templateUrl: './clientelist.component.html',
  styleUrl: './clientelist.component.scss',
  standalone: true,
})
  

export class ClientelistComponent {
  lista: Cliente[] = [];
  clienteService = inject(ClienteService);

  clienteEdit: Cliente = new Cliente({
    clienteId: 0,
    nome: '',
    email: '',
    telefone: '',
    cpfCnpj: '',
    endereco: '',
    dataCadastro: '',
  });

  modalService = inject(MdbModalService);
  @ViewChild('modalClienteDetalhe') modalClienteDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.clienteService.findAll().subscribe({
      next: (lista: Cliente[]) => {
        this.lista = lista;
      },
      error: (err: { message: any }) => {
        Swal.fire({
          title: 'Erro ao carregar lista de clientes',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Fechar',
        });
      },
    });
  }

  deleteById(cliente: Cliente) {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe({
          next: () => {
            this.lista = this.lista.filter(c => c.id !== cliente.id);
          },
          error: (err: { message: any }) => {
            Swal.fire({
              title: 'Erro ao deletar cliente',
              text: err.message,
              icon: 'error',
              confirmButtonText: 'Fechar',
            });
          },
        });
        Swal.fire({
          title: 'Deletado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  new() {
    this.clienteEdit = new Cliente({
      clienteId: 0,
      nome: '',
      email: '',
      telefone: '',
      cpfCnpj: '',
      endereco: '',
      dataCadastro: '',
    });
    this.modalRef = this.modalService.open(this.modalClienteDetalhe);
  }

  editById(cliente: Cliente) {
    this.clienteEdit = Object.assign({}, cliente);
    this.modalRef = this.modalService.open(this.modalClienteDetalhe);
  }

  retornoDetalhes(cliente: Cliente) {
    if (cliente.id > 0) {
      // Editando
      this.clienteService.update(cliente).subscribe({
        next: () => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Cliente atualizado com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        error: (err: { message: any }) => {
          Swal.fire({
            title: 'Erro ao atualizar cliente',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Fechar',
          });
        },
      });
    }

    this.modalRef.close();
  }
}

