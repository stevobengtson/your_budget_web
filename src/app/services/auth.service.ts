import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserApiService, UserData } from './api/user-api.service';
import { environment } from "../../environments/environment";

export interface AuthResponse {
  token: string;
  data: UserData;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string | null = null;

  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  private _userSub$: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);
  public get userData$(): Observable<UserData | null> {
    return this._userSub$.asObservable();
  }

  constructor(private http: HttpClient, private userApiService: UserApiService) {
    let idToken = localStorage.getItem('id_token');
    let strUserData = localStorage.getItem('user_data');
    let userData = strUserData == null ? null : JSON.parse(strUserData);
    this._authSub$.next(idToken !== null);
    this._userSub$.next(userData);
  }

  public get isAuthenticated(): boolean {
    return this._authSub$.value;
  }

  public get userData(): UserData | null {
    return this._userSub$.value;
  }

  login(email: string, password: string): Observable<void> {
    return from(this.http.post<AuthResponse>(environment.apiUrl + '/authentication_token', { email, password })).pipe(
      map((t: AuthResponse) => this.handleSignInResponse(t))
    );
  }

  logout() {
    this._authSub$.next(false);
    this._userSub$.next(null);
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_data');
  }

  private handleSignInResponse(auth: AuthResponse): void {
    this._authSub$.next(true);
    localStorage.setItem('id_token', auth.token);
    this._userSub$.next(auth.data);
    localStorage.setItem('user_data', JSON.stringify(auth.data));
  }
}
