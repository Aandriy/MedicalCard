import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameContainerComponent } from './frame-container.component';

describe('FrameContainerComponent', () => {
  let component: FrameContainerComponent;
  let fixture: ComponentFixture<FrameContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
