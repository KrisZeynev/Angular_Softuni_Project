import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommentService } from '../../../core/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-comment-create-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-create-form.html',
  styleUrl: './comment-create-form.css',
  standalone: true,
})
export class CommentCreateForm implements OnInit {
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

    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!;
    });
  }

  onSubmit(): void {
    if (this.commentForm.invalid) {
      return;
    }

    if (this.currAccessToken) {
      this.commentService
        .postComment(
          this.currAccessToken,
          this.bookId,
          this.commentForm.value.text
        )
        .subscribe({
          next: () => {
            this.commentForm.reset();
            this.location.back();
          },
          error: (err) => {
            console.error('Error posting a new comment:', err);
          },
        });
    }
  }
}
