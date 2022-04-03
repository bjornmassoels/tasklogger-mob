import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register.component';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: RegisterComponent}])
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
