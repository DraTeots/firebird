import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellExampleComponent } from './shell-example.component';
import {provideNoopAnimations} from "@angular/platform-browser/animations";

describe('ShellExampleComponent', () => {
  let component: ShellExampleComponent;
  let fixture: ComponentFixture<ShellExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellExampleComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
