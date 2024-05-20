import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScoresListComponent } from './my-scores-list.component';

describe('MyScoresListComponent', () => {
  let component: MyScoresListComponent;
  let fixture: ComponentFixture<MyScoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyScoresListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyScoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
