import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [HeaderComponent, MatSnackBarModule],
})
export class SharedModule {}
