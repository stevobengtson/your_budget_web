import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetApiService, BudgetData, BudgetsResponse } from '../services/api/budget-api.service';
import { AuthService } from '../services/auth.service';
import { BlockUIService } from '../services/block-ui.service';
import { CreateBudgetComponent } from './create/create_budget.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
    public options: FormGroup;
    public budget: BudgetData | null = null;
    public accountId: number | null = null;

    private userId: number = 0;

    constructor(
        fb: FormBuilder,
        public dialog: MatDialog,
        private budgetApiService: BudgetApiService,
        private authService: AuthService,
        private blockUIService: BlockUIService
    ) {
        this.options = fb.group({
            bottom: 0,
            fixed: false,
            top: 0,
        });
    }

    ngOnInit(): void {
        this.userId = this.authService.userData?.id || 0;

        this.blockUIService.block();
        this.loadBudgets();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateBudgetComponent, {
            width: '450px',
            data: {},
        });

        dialogRef.afterClosed().subscribe((result: BudgetData) => {
            this.budgetApiService.create(result.name, this.userId).subscribe((budget: BudgetData) => {
                this.budget = budget;
            });
        });
    }

    showAccount(accountId: number): void {
        console.log("Account selected: " + accountId);
        this.accountId = accountId;
    }

    private loadBudgets(): void {
        this.budgetApiService.getUserBudgets(this.userId).subscribe((budgets: BudgetsResponse) => {
            if (budgets["hydra:member"].length > 0) {
                // Pick the first one for now
                this.budget = budgets["hydra:member"][0];
            }
            this.blockUIService.unblock();
        }, (error: any) => {
            console.log(error);
            this.blockUIService.unblock();
        });
    }
}
