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
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    
    // if (id) {
    //   this.commentService.(id).subscribe(comment => {
    //     this.commentText = comment.text;
    //   });
    // }
  }

  onSubmit(): void {
    console.log('on submit')
  }
}
