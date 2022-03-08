import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserResponse {
  id: 0;
  email: string;
  roles: Array<string>;
  password: string;
  budgets: Array<string>;
  username: string;
  userIdentifier: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<UserResponse>('/api/users/' + id);
  }
}
