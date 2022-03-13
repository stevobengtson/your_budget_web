import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AccountApiService, AccountCollection, AccountData } from "../services/api/account-api.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnChanges {
    @Input() budgetId: number = 0;

    public accounts: AccountData[] = [];

    constructor(private accountApiService: AccountApiService) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const propName in changes) {
            if (propName == 'budgetId') {
                this.loadAccounts();
            }
        }
    }

    private loadAccounts(): void {
        this.accountApiService.getBudgetAccounts(this.budgetId).subscribe((accounts: AccountCollection) => {
            this.accounts = accounts["hydra:member"];
        });
    }
}
