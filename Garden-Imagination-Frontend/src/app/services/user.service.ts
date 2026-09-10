import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly backend: string = "http://localhost:4000/users";

  constructor(private http: HttpClient) { }

  // --- Authentication & Account Lifecycle ---
  register(userData: FormData): Observable<User> {
    return this.http.post<User>(`${this.backend}/register`, userData);
  }

  login(username: string, password: string, type: string): Observable<User> {
    return this.http.post<User>(`${this.backend}/login`, { username, password, type });
  }

  // --- Validation & Search Queries ---
  existsByUsername(username: string): Observable<{ exists: boolean; user: User }> {
    const params = new HttpParams().set('username', username);
    return this.http.get<{ exists: boolean; user: User }>(`${this.backend}/check-username`, { params });
  }

  existsByUsernameOrEmail(user: User): Observable<{ message: string }> {
    const params = new HttpParams()
      .set('username', user.username)
      .set('email', user.email);
    return this.http.get<{ message: string }>(`${this.backend}/check-credentials`, { params });
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.backend}/by-username/${username}`);
  }

  // --- Stats & Collections ---
  getAllOwners(): Observable<User[]> {
    return this.http.get<User[]>(`${this.backend}/owners`);
  }

  getOwnersCount(): Observable<number> {
    return this.http.get<number>(`${this.backend}/owners/count`);
  }

  getAllDecorators(): Observable<User[]> {
    return this.http.get<User[]>(`${this.backend}/decorators`);
  }

  getDecoratorsCount(): Observable<number> {
    return this.http.get<number>(`${this.backend}/decorators/count`);
  }

  // --- Account Status Controls ---
  activateUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/activate`, {});
  }

  deactivateUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/deactivate`, {});
  }

  // --- User Profile Updates ---
  changePassword(username: string, password: string): Observable<{ message: string; user: User }> {
    return this.http.patch<{ message: string; user: User }>(`${this.backend}/change-password`, { username, password });
  }

  changeUsername(id: number, username: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/username`, { username });
  }

  changeFirstname(id: number, firstname: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/firstname`, { firstname });
  }

  changeLastname(id: number, lastname: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/lastname`, { lastname });
  }

  changeGender(id: number, gender: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/gender`, { gender });
  }

  changeAddress(id: number, address: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/address`, { address });
  }

  changeContact(id: number, contact: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/contact`, { contact });
  }

  changeEmail(id: number, email: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/email`, { email });
  }

  changeCreditCard(id: number, creditCard: string): Observable<User> {
    return this.http.patch<User>(`${this.backend}/${id}/credit-card`, { creditCard });
  }

  changeProfilePicture(id: number, profilePicture: File): Observable<User> {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    return this.http.patch<User>(`${this.backend}/${id}/profile-picture`, formData);
  }
}
