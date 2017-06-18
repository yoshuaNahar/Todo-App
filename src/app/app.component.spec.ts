import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { DebugElement } from "@angular/core";

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    }); // I dont need .compileComponents(); here because I am using webpack
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    inputEl = fixture.debugElement; // unsure if this is correct element
    fixture.detectChanges();
  });

  it('should create the AppComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should create new todo on enter key event'`, async(() => {
    inputEl.triggerEventHandler('window:keydown', null);
    fixture.detectChanges();

    // how do I trigger specific keys pressed?

    expect(component.todos.length).toBe(4);
  }));

});
