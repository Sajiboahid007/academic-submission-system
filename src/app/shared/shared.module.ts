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
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MeterGroupModule } from 'primeng/metergroup';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableCaptionComponent } from './components/table-caption/table-caption.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AccordionModule } from 'primeng/accordion';

const materialNgModule = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
];

const primeNgModules = [
  BadgeModule,
  ButtonModule,
  CardModule,
  DividerModule,
  FileUploadModule,
  FloatLabelModule,
  InputTextModule,
  MessageModule,
  MeterGroupModule,
  PasswordModule,
  SelectModule,
  SelectButtonModule,
  ToggleSwitchModule,
  TableModule,
  IconFieldModule,
  InputIconModule,
  ConfirmDialogModule,
  AccordionModule
];

@NgModule({
  declarations: [

    TableCaptionComponent,
    PageHeaderComponent
  ],
  imports: [CommonModule, FlexLayoutModule, ...materialNgModule, ...primeNgModules],
  exports: [ReactiveFormsModule, FlexLayoutModule, ...materialNgModule, ...primeNgModules, TableCaptionComponent, PageHeaderComponent]
})
export class SharedModule { }
