import { CategoriesComponent } from './receipt-list/categories/categories';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { NgModule } from '@angular/core';
import { ReceiptComponent } from './shared/receipt/receipt';

@NgModule({
	declarations: [
    CategoriesComponent,
    ReceiptComponent
  ],
	imports: [
    CommonModule,
    IonicModule
  ],
	exports: [
    CategoriesComponent,
    ReceiptComponent
  ]
})
export class ComponentsModule {}
