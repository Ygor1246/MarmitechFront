import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/api/categoria';

  constructor() { }

  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API}/findById/${id}`);
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.API}/save`, categoria);
  }

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API}/update/${categoria.id}`, categoria);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }
}
