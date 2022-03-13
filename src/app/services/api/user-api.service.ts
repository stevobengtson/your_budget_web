import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCollection, BaseData } from './base-data.interface';

export interface UserData extends BaseData {
  email: string;
  roles: Array<string>;
}

export interface UserCollection extends BaseCollection<UserData> {
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<UserCollection>('/api/users');
  }

  get(id: number) {
    return this.http.get<UserData>('/api/users/' + id);
  }

  create(email: string, password: string) {
    return this.http.post<UserData>('/api/users', {
      email,
      plainPassword: password
    });
  }
}
