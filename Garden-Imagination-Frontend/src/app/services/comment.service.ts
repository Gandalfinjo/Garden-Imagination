import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly backend: string = "http://localhost:4000/comments";

  constructor(private http: HttpClient) { }

  getAverageGrade(firmId: number): Observable<number> {
    return this.http.get<number>(`${this.backend}/firm/${firmId}/average-grade`);
  }

  getFirmComments(firmId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.backend}/firm/${firmId}`);
  }

  getAppointmentComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.backend}/appointment/${id}`);
  }

  leaveComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.backend}`, comment);
  }
}
