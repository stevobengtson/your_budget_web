import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserResponse {
  id: 0;
  email: string;
  roles: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<UserResponse>('/api/users/' + id);
  }

  create(email: string, password: string) {
    return this.http.post<UserResponse>('/api/users', {
      email, password
    });
  }
}
