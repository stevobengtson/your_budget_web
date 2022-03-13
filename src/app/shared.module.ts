import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [CommonModule, FormsModule, AngularMaterialModule]
})
export class SharedModule { }