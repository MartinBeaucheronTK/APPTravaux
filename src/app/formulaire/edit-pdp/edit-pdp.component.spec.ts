import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPDPComponent } from './edit-pdp.component';

describe('EditPDPComponent', () => {
  let component: EditPDPComponent;
  let fixture: ComponentFixture<EditPDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPDPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
