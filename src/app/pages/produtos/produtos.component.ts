import { Component} from '@angular/core';
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
            Swal.fire('Produto deletado com sucesso!', '', 'success');
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
 




 