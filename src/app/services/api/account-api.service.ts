import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseCollection, BaseData } from "./base-data.interface";

export interface AccountData extends BaseData {
    name: string;
    description: string;
    balance: number;
}

export interface AccountCollection extends BaseCollection<AccountData> {
}

@Injectable({
    providedIn: 'root'
})
export class AccountApiService {
    constructor(private http: HttpClient) { }

    getBudgetAccounts(budgetId: number) {
        return this.http.get<AccountCollection>('/api/budgets/' + budgetId + '/accounts');
    }
}