import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommentService } from '../../../core/services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-edit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-edit-form.html',
  styleUrl: './comment-edit-form.css',
  standalone: true,
})
export class CommentEditForm implements OnInit {
  commentForm: FormGroup;
  bookId!: string;
  currAccessToken: string | null = null;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.commentForm = this.fb.group({
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/\S+/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.currAccessToken = localStorage.getItem('accessToken');
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (this.currAccessToken && id) {
      this.bookId = id;
      this.commentService
        .getCommentById(this.currAccessToken, id)
        .subscribe((comment) => {
          this.commentForm.patchValue({ text: comment.text });
        });
    }
  }

  onSubmit(): void {
    if (this.commentForm.invalid || !this.currAccessToken) {
      return;
    }

    const updatedText = this.commentForm.value.text;
    const commentId = this.route.snapshot.paramMap.get('id');

    if (commentId) {
      this.commentService
        .editComment(this.currAccessToken, commentId, updatedText)
        .subscribe({
          next: () => {
            console.log('Comment updated successfully');
            this.location.back();
          },
          error: (err) => {
            console.error('Error updating comment:', err);
          },
        });
    }
  }
}
