import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebswitchComponent } from './webswitch.component';

describe('WebswitchComponent', () => {
  let component: WebswitchComponent;
  let fixture: ComponentFixture<WebswitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebswitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
