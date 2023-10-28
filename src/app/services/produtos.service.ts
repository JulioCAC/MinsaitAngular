import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  api = 'http://localhost:8080/api/produtos'

  constructor(private http: HttpClient) {}

  buscarProdutos() {
    return this.http.get<IProduto[]>(this.api);
  }
}
