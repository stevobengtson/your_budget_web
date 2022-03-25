import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { AccountApiService, AccountCollection, AccountData } from "../../services/api/account-api.service";

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnChanges {
    @Input() budgetId: number = 0;
    @Output() onAccountPicked = new EventEmitter<number>();

    public accounts: AccountData[] = [];

    constructor(private accountApiService: AccountApiService) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const propName in changes) {
            if (propName == 'budgetId') {
                this.loadAccounts();
            }
        }
    }

    public addAccount(): void {
        alert("Work in Progress");
    }

    public pickAccount(accountId: number): void {
        console.log("Account picked: " + accountId);
        this.onAccountPicked.emit(accountId);
    }

    private loadAccounts(): void {
        this.accountApiService.getBudgetAccounts(this.budgetId).subscribe((accounts: AccountCollection) => {
            this.accounts = accounts["hydra:member"];
        });
    }
}
