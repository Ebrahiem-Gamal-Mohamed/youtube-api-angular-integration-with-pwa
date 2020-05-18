import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { SharedNzmodulesModule } from "./../../shared/_modules/shared-nzmodules.module";
import { ParseDurationPipe } from "./../../core/_pipes/parse-duration.pipe";

@NgModule({
  declarations: [ParseDurationPipe],
  imports: [
    CommonModule,
    SharedNzmodulesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    SharedNzmodulesModule,
    FormsModule,
    ReactiveFormsModule,
    ParseDurationPipe,
  ],
})
export class SharedModule {}
