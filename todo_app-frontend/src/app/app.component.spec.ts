import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {

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

  it("should create the AppComponent", async(() => {
    expect(component).toBeTruthy();
  }));

});
