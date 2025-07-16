import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastWeekReportsComponent } from './last-week-reports.component';

describe('LastWeekReportsComponent', () => {
  let component: LastWeekReportsComponent;
  let fixture: ComponentFixture<LastWeekReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastWeekReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastWeekReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
