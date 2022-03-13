import { NgModule } from '@angular/core';
import { AccountModule } from '../account/account.module';
import { SharedModule } from '../shared.module';
import { BudgetComponent } from './budget.component';
import { CreateBudgetComponent } from './create/create_budget.component';

@NgModule({
    declarations: [
        BudgetComponent,
        CreateBudgetComponent
    ],
    imports: [
        SharedModule,
        AccountModule
    ]
})
export class BudgetModule { }
