import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Cliente } from '../../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientedetails',
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './clientedetails.component.html',
  styleUrls: ['./clientedetails.component.scss'],
  standalone: true
})
export class ClientedetailsComponent {
  @Input() cliente: Cliente = new Cliente({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    dataCadastro: ''

  });
  @Output() retorno = new EventEmitter<Cliente>();

  clienteService = inject(ClienteService);
  routerSaver = inject(Router);
  route = inject(ActivatedRoute);

  salvar() {
    if (this.cliente.id > 0) {
      this.clienteService.update(this.cliente).subscribe({
        next: (updated) => Swal.fire('Atualizado', 'Cliente atualizado!', 'success').then(() => this.retorno.emit(updated)),
        error: (err) => Swal.fire('Erro', err.message, 'error')
      });
    } else {
      this.clienteService.create(this.cliente).subscribe({
        next: (created) => Swal.fire('Criado', 'Cliente criado!', 'success').then(() => {
          this.retorno.emit(created);
          this.routerSaver.navigate(['admin/cliente']);
        }),
        error: (err) => Swal.fire('Erro', err.message, 'error')
      });
    }
  }
}
