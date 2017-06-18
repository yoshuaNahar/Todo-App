import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTodoComponent } from './selected-todo.component';

describe('SelectedTodoComponent', () => {

  let fixture: ComponentFixture<SelectedTodoComponent>;
  let component: SelectedTodoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedTodoComponent]
    });
    fixture = TestBed.createComponent(SelectedTodoComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges(); // unsure if this is needed...
  });

  it('should create the SelectedTodoComponent', () => {
    expect(component).toBeTruthy();
  });

});
