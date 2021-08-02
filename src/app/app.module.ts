import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadToDoComponent } from './read-to-do/read-to-do.component';
import { WriteToDoComponent } from './write-to-do/write-to-do.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ReadToDoComponent,
    WriteToDoComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
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
