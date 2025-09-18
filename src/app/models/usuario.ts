

export class Usuario {
    /*usuarioId: any;
  static id: number;
  static nome: string;
    findAll() {
      throw new Error('Method not implemented.');
    }*/
    id!: number;
    nome!: string;
    email!: string;
    senha!: string;
    cargo!: string;
    data_criacao!: string;

    constructor( data: any ) {
        this.id = data.usuarioId;
        this.nome = data.nome;
        this.email = data.email;
        this.senha = data.senha;
        this.cargo = data.cargo;
        this.data_criacao = data.data_criacao;

    }

}
                                                                                                                                                                                                                