import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcontainerComponent } from './topcontainer.component';

describe('TopcontainerComponent', () => {
  let component: TopcontainerComponent;
  let fixture: ComponentFixture<TopcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopcontainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
