import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NzTableModule,
  NzButtonModule,
  NzNotificationModule,
  NzInputModule,
  NzIconModule,
  NzDividerModule,
  NzRateModule,
} from "ng-zorro-antd";

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzDividerModule,
    NzRateModule,
    NzNotificationModule,
  ],
  exports: [
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzDividerModule,
    NzRateModule,
    NzNotificationModule,
  ],
})
export class SharedNzmodulesModule {}
