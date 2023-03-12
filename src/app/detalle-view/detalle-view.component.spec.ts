import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleViewComponent } from './detalle-view.component';

describe('DetalleViewComponent', () => {
  let component: DetalleViewComponent;
  let fixture: ComponentFixture<DetalleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
