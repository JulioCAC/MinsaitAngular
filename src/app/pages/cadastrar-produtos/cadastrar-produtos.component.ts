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
    nome: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    codigoBarras: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    preco: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern(/^\d{1,6}(\.\d{0,2})?$/)])
  });

  enviar() {
    const produto: IProduto = this.produtoForm.value as IProduto
    
    this.produtosService.cadastrarProduto(produto).subscribe(
      (result) => {
        Swal.fire({
          title: 'Produto Cadastrado!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#003ee0'
        });
      },
      (error) => {
        const { message } = error;
        Swal.fire('DEU ERRO', message, 'error');
      }
    );
    this.produtoForm.reset();
  }
}
