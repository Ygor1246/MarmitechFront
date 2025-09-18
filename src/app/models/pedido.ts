import { PedidoItem } from "./pedido-item";

export class Pedido {
    nomeCliente!: string;
    status!: string;
    enderecoEntrega!: string;
    pedidoItems!: PedidoItem[];
    valorTotal!: number;
}
