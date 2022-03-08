import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<void> {
    return from(this.http.post<AuthResponse>('/api/authentication_token', { email, password })).pipe(
      map((t: AuthResponse) => this.handleSignInResponse(t))
    );
  }

  private handleSignInResponse(auth: AuthResponse): void {
    this._authSub$.next(true);
    localStorage.setItem('id_token', auth.token);
  }
}
