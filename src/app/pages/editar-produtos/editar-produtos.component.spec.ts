import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProdutosComponent } from './editar-produtos.component';

describe('EditarProdutosComponent', () => {
  let component: EditarProdutosComponent;
  let fixture: ComponentFixture<EditarProdutosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProdutosComponent]
    });
    fixture = TestBed.createComponent(EditarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
