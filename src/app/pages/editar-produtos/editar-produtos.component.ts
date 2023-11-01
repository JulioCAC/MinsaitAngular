import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {
  constructor(private produtosService: ProdutosService, private route: ActivatedRoute) {}

  produtoForm: FormGroup = new FormGroup({
    id: new FormControl(null),  
    nome: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    codigoBarras: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    preco: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern(/^\d{1,6}(\.\d{0,2})?$/)])
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.produtoForm.get('id')?.setValue(id);
    });
  }

  alterar() {
    const produto: IProduto = this.produtoForm.value as unknown as IProduto;
    this.produtosService.alterarProduto(produto.id, produto).subscribe(
      (result) => {
        Swal.fire({
          title: 'Produto Alterado!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#003ee0'
        }).then((result)=> {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });;
      },
      (error) => {
        const { message } = error;
        Swal.fire('DEU ERRO', message, 'error');
      }
    );
  }  
}

