import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BudgetApiService, BudgetData, BudgetsResponse } from '../services/api/budget-api.service';
import { UserApiService, UserData } from '../services/api/user-api.service';
import { AuthService } from '../services/auth.service';
import { CreateBudgetComponent } from './create/create_budget.component';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
    private userId: number = 0;
    public budget: BudgetData | null = null;

    constructor(
        public dialog: MatDialog,
        private budgetApiService: BudgetApiService,
        private authService: AuthService,
        private userApiService: UserApiService,
        private router: Router) { }

    ngOnInit(): void {
        this.userId = this.authService.userData?.id || 0;
        this.loadBudgets();
        this.loadUsers();
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

    private loadBudgets(): void {
        this.budgetApiService.getUserBudgets(this.userId).subscribe((budgets: BudgetsResponse) => {
            console.log(budgets);
            if (budgets["hydra:member"].length > 0) {
                // Pick the first one for now
                this.budget = budgets["hydra:member"][0];
            } else {
                this.openDialog();
            }
        }, (error: any) => {
            console.log(error);
            this.openDialog();
        });
    }

    private loadUsers(): void {
        this.userApiService.get(this.userId).subscribe((user: UserData) => {
            console.log(user);
        });
    }
}
