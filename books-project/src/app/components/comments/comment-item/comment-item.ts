import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-comment-item',
  imports: [CommonModule],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
  standalone: true
})
export class CommentItem implements OnInit {
  @Input() comment!: Comment;
  currentUserId: string | null = null;
  isOwner: boolean = false;

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.isOwner = this.currentUserId === this.comment._ownerId ? true : false
  }
  
}
