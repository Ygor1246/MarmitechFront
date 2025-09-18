import { Component, inject } from '@angular/core';
import { Historico } from '../../../models/historico';
import { HistoricoService } from '../../../services/historico.service';

@Component({
  selector: 'app-historicolist',
   imports: [],
  templateUrl: './historicolist.component.html',
  styleUrl: './historicolist.component.scss'
})
export class HistoricolistComponent {
  lista: Historico[] = [];
  historicoService = inject(HistoricoService);
 
 
 
  constructor() {

   }


}
