import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopEspecialistasComponent } from './top-especialistas.component';

describe('TopEspecialistasComponent', () => {
  let component: TopEspecialistasComponent;
  let fixture: ComponentFixture<TopEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopEspecialistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
