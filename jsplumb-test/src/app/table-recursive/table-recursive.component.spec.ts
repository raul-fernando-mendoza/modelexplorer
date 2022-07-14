import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecursiveComponent } from './table-recursive.component';

describe('TableRecursiveComponent', () => {
  let component: TableRecursiveComponent;
  let fixture: ComponentFixture<TableRecursiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRecursiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
