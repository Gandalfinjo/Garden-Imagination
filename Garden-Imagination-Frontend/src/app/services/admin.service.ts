import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly backend: string = "http://localhost:4000/admins";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${this.backend}/login`, { username: username, password: password });
  }
}
