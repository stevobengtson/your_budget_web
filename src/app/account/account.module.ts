import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AccountComponent } from './account.component';

@NgModule({
    declarations: [
        AccountComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        AccountComponent
    ]
})
export class AccountModule { }
