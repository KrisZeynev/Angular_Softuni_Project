import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBook } from './add-new-book';

describe('AddNewBook', () => {
  let component: AddNewBook;
  let fixture: ComponentFixture<AddNewBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
