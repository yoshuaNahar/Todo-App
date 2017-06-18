import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTodoComponent } from './selected-todo.component';

describe('SelectedTodoComponent', () => {
  let component: SelectedTodoComponent;
  let fixture: ComponentFixture<SelectedTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedTodoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
