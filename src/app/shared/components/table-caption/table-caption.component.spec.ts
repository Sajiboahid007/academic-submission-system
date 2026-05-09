import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCaptionComponent } from './table-caption.component';

describe('TableCaptionComponent', () => {
  let component: TableCaptionComponent;
  let fixture: ComponentFixture<TableCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCaptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCaptionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
