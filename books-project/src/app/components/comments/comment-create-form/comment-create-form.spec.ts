import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCreateForm } from './comment-create-form';

describe('CommentCreateForm', () => {
  let component: CommentCreateForm;
  let fixture: ComponentFixture<CommentCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentCreateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentCreateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
