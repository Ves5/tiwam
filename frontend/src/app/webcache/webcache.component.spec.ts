import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcacheComponent } from './webcache.component';

describe('WebcacheComponent', () => {
  let component: WebcacheComponent;
  let fixture: ComponentFixture<WebcacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebcacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
