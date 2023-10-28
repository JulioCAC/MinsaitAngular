import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {
  constructor(private produtosService: ProdutosService){}
  produtoForm = new FormGroup({
    nome: new FormControl("", Validators.required),
    codigoBarras: new FormControl("", Validators.required),
    preco: new FormControl(0, Validators.required)
  });
  enviar() {
    const produto: IProduto = this.produtoForm.value as IProduto
    

    
    this.produtosService.cadastrarProduto(produto).subscribe(
      (result) => {
        Swal.fire(
          'FEITO!',
          'Usuário cadastrado com sucesso!',
          'success'
        );
      },
      (error) => {
        const { message } = error;
        Swal.fire('DEU ERRO', message, 'error');
      }
    );
  }

}
