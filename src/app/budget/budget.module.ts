import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AccountListComponent } from './account-list/account-list.component';
import { BudgetComponent } from './budget.component';
import { CreateBudgetComponent } from './create/create_budget.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@NgModule({
    declarations: [
        BudgetComponent,
        CreateBudgetComponent,
        AccountListComponent,
        TransactionListComponent
    ],
    imports: [
        SharedModule
    ]
})
export class BudgetModule { }
