import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadToDoComponent } from './read-to-do/read-to-do.component';
import { NgxsModule } from '@ngxs/store';
import { TaskState } from './store/task.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRemoveTaskComponent } from './dialog-remove-task/dialog-remove-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ReadToDoComponent,
    DialogAddTaskComponent,
    DialogRemoveTaskComponent,
    TaskDetailsComponent,
    AppHeaderComponent
    ],
    entryComponents:[DialogAddTaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    NgxsModule.forRoot([
      TaskState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
