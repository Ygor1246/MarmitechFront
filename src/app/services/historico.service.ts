import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historico } from '../models/historico';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/api/historico';

  constructor() { }

  findAll(): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Historico> {
    return this.http.get<Historico>(`${this.API}/findById/${id}`);
  }

  create(historico: Historico): Observable<Historico> {
    return this.http.post<Historico>(`${this.API}/save`, historico);
  }

  update(historico: Historico): Observable<Historico> {
    return this.http.put<Historico>(`${this.API}/update/${historico.id}`, historico);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }
}
