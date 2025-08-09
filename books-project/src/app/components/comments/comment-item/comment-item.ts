import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-comment-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
  standalone: true,
})
export class CommentItem implements OnInit {
  @Input() comment!: Comment;
  @Output() deleted = new EventEmitter<string>(); // add to reflect the list with all comments
  currentUserId: string | null = null;
  currAccessToken: string | null = null;
  isOwner: boolean = false;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.currAccessToken = localStorage.getItem('accessToken');
    this.isOwner = this.currentUserId === this.comment._ownerId ? true : false;
  }

  onDelete(): void {
    console.log('delete book', this.comment._id);

    if (this.currAccessToken && this.comment._id) {
      this.commentService
        .deleteComment(this.currAccessToken, this.comment._id)
        .subscribe({
          next: () => {
            this.deleted.emit(this.comment._id); // say to parent
            console.log('Comment deleted successfully');
          },
          error: (err) => {
            console.error('Error deleting comment:', err);
          },
        });
    }
  }
}
