import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  produtos: IProduto[] = [];
  produtoForm = new FormGroup({
    id: new FormControl("", Validators.required),
    nome: new FormControl("", Validators.required),
    codigoBarras: new FormControl("", Validators.required),
    preco: new FormControl(0, Validators.required)
  });


  constructor(private produtosService: ProdutosService){}

  ngOnInit() {
    this.produtosService.buscarProdutos().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error) => {
        console.log(error);
      }
    );

  }
  alterar() {
    const produto: IProduto = this.produtoForm.value as unknown as IProduto;
    const novoProduto: IProduto = {
      id: produto.id,
      nome: produto.nome,
      codigoBarras: produto.codigoBarras,
      preco: produto.preco
    };
  
    this.produtosService.alterarProduto(novoProduto.id, novoProduto).subscribe(
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
  



  

  delete(produto: IProduto) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#495057',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.deletarProduto(produto.id).subscribe(
          () => {
            Swal.fire({
              title: 'Produto Deletado!',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#003ee0'
            }).then((result)=> {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            
            
  
          },
          (error) => {
            console.error(error);
            Swal.fire('Erro ao deletar o produto', 'Ocorreu um erro durante a exclusão.', 'error');
          }
        );
      }
    });
  }
  }
 




 