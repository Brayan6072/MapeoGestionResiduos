import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthReportsComponent } from './last-month-reports.component';

describe('LastMonthReportsComponent', () => {
  let component: LastMonthReportsComponent;
  let fixture: ComponentFixture<LastMonthReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastMonthReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastMonthReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
