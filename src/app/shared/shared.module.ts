import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatBadgeModule} from '@angular/material/badge';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatSnackBarModule,MatExpansionModule,ReactiveFormsModule,FormsModule,NgxSpinnerModule,MatBadgeModule],
  exports: [HeaderComponent, MatSnackBarModule,MatExpansionModule,ReactiveFormsModule,FormsModule,NgxSpinnerModule,MatBadgeModule],
})
export class SharedModule {}
