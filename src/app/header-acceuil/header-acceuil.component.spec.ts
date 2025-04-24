import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAcceuilComponent } from './header-acceuil.component';

describe('HeaderAcceuilComponent', () => {
  let component: HeaderAcceuilComponent;
  let fixture: ComponentFixture<HeaderAcceuilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAcceuilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
