import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-comment-item',
  imports: [CommonModule],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
  standalone: true
})
export class CommentItem {
  @Input() comment!: Comment;
}
