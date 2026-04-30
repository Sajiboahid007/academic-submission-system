import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MeterGroupModule } from 'primeng/metergroup';
import { SelectButtonModule } from 'primeng/selectbutton';
// import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
const primeNgModules = [
  DividerModule,
  BadgeModule,
  MeterGroupModule,
  FileUploadModule,
  ToggleSwitchModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    ButtonModule,
    SelectButtonModule,
    ToggleSwitchModule,
    FlexLayoutModule,
    ...primeNgModules,
  ],
  exports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    ButtonModule,
    SelectButtonModule,
    ToggleSwitchModule,
    FlexLayoutModule,
    ...primeNgModules,
  ],
})
export class SharedModule { }
