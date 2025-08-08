import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-create-form',
  imports: [],
  templateUrl: './comment-create-form.html',
  styleUrl: './comment-create-form.css',
})
export class CommentCreateForm {
  @Output() commentCreated = new EventEmitter<string>();

  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.commentForm.invalid) {
      return;
    }
    
    // Emit the text of the new comment into the parent component
    this.commentCreated.emit(this.commentForm.value.text);
    this.commentForm.reset();
  }
}
