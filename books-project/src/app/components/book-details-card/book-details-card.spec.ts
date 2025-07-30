import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsCard } from './book-details-card';

describe('BookDetailsCard', () => {
  let component: BookDetailsCard;
  let fixture: ComponentFixture<BookDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
