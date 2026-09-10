import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  register(user: User): Observable<Response> {
    const formData = new FormData();

    formData.append("id", user.id.toString());
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("firstname", user.firstname);
    formData.append("lastname", user.lastname);
    formData.append("type", user.type);
    formData.append("gender", user.gender);
    formData.append("address", user.address);
    formData.append("contact", user.contact);
    formData.append("email", user.email);
    formData.append("profilePicture", user.profilePicture);
    formData.append("creditCard", user.creditCard);
    formData.append("status", user.status);

    return this.http.post<Response>(`${this.backend}/register`, formData);
  }

  login(username: string, password: string, type: string): Observable<User> {
    return this.http.post<User>(`${this.backend}/login`, { username, password, type });
  }

  existsByUsername(username: string): Observable<Response> {
    return this.http.get<Response>(`${this.backend}/exists/username/${username}`);
  }

  existsByUsernameOrEmail(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.backend}/exists`, { username: user.username, email: user.email });
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.backend}/username/${username}`);
  }

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

  activateUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/activate`, {});
  }

  deactivateUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/deactivate`, {});
  }

  changeUsername(id: number, username: string): Observable<Response> {
    return this.http.put<Response>(`${this.backend}/${id}/username`, { username });
  }

  changePassword(username: string, password: string): Observable<Response> {
    return this.http.put<Response>(`${this.backend}/password`, { username, password });
  }

  changeFirstname(id: number, firstname: string): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/firstname`, { firstname });
  }

  changeLastname(id: number, lastname: string): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/lastname`, { lastname });
  }

  changeGender(id: number, gender: string): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/gender`, { gender });
  }

  changeAddress(id: number, address: string): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/address`, { address });
  }

  changeContact(id: number, contact: string): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/contact`, { contact });
  }

  changeEmail(id: number, email: string): Observable<Response> {
    return this.http.put<Response>(`${this.backend}/${id}/email`, { email });
  }

  changeProfilePicture(id: number, profilePicture: File): Observable<User> {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    return this.http.put<User>(`${this.backend}/${id}/profile-picture`, formData);
  }

  changeCreditCard(id: number, creditCard: string): Observable<User> {
    return this.http.put<User>(`${this.backend}/${id}/credit-card`, { creditCard });
  }
}
