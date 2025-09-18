import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuariodetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './usuariodetails.component.html',
  styleUrl: './usuariodetails.component.scss',
  standalone: true,
})
export class UsuariodetailsComponent {
  //usuarioId: number | undefined;

  @Input("usuario") usuario: Usuario = new Usuario({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    dataCadastro: '',
    ativo: true
  });
  @Output("retorno") retorno = new EventEmitter<any>();
 
  route = inject(ActivatedRoute);
  routerSaver = inject(Router);
 usuarioService = inject(UsuariosService);
  
 constructor() {
    /*const id = this.route.snapshot.paramMap.get('id');
    console.log(id);*/
    //if (id) {
      //this.findById(parseInt(id));
  //}
  }
  usuarioServices = inject(UsuariosService);
  
  
  
  
  salvar() {
    if (this.usuario.id > 0) {
      this.usuarioServices.update(this.usuario).subscribe({
        next: (updatedUsuario) => {
          Swal.fire({
            title: 'Atualizado!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.usuario = updatedUsuario;
        },
        error: (err) => {
          Swal.fire({
            title: 'Erro ao atualizar pessoa',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Fechar',
          });
        },
      });
    } else {
      this.usuarioServices.create(this.usuario).subscribe({
        next: (createdUsuario) => {
          Swal.fire({
            title: 'Criado!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.usuario = createdUsuario;
        },
        error: (err) => {
          Swal.fire({
            title: 'Erro ao criar usuário',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Fechar',
          });
        },
      });
     this.routerSaver.navigate(['admin/usuarios'], {state: { usuarioNovo: this.usuario }});
    }
    this.retorno.emit(this.usuario);
  }
}
