
export class Historico {
    id!: number;
    pedidoId!: number;
    clienteId!: number;
    dataEvento!: string;
    tipoEvento!: string;
    detalhe!: string;

    constructor(data: any) {
        this.id = data.id;
        this.pedidoId = data.pedidoId;
        this.clienteId = data.clienteId;
        this.dataEvento = data.dataEvento;
        this.tipoEvento = data.tipoEvento;
        this.detalhe = data.detalhe;
    }
}
