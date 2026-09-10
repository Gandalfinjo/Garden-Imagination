import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firm } from '../models/firm';

@Injectable({
  providedIn: 'root'
})
export class FirmService {
  private readonly backend: string = "http://localhost:4000/firms";

  constructor(private http: HttpClient) { }

  addFirm(firm: Firm): Observable<Firm> {
    return this.http.post<Firm>(`${this.backend}`, firm);
  }

  getAllFirms(): Observable<Firm[]> {
    return this.http.get<Firm[]>(`${this.backend}`);
  }

  getById(id: number): Observable<Firm> {
    return this.http.get<Firm>(`${this.backend}/${id}`);
  }

  getDecoratorFirm(decorator: string): Observable<Firm> {
    return this.http.get<Firm>(`${this.backend}/decorator/${decorator}`);
  }
}
