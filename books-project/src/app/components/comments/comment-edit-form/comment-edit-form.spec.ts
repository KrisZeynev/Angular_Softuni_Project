import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEditForm } from './comment-edit-form';

describe('CommentEditForm', () => {
  let component: CommentEditForm;
  let fixture: ComponentFixture<CommentEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
