import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ToDoList';
  constructor(private permissionsService:NgxPermissionsService,
              private matIconRegistry:MatIconRegistry,
              private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      `walmart`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/walmart.svg")    );
  }

  ngOnInit(): void {
    const perm=["EDITOR"];

    this.permissionsService.loadPermissions(perm);
  }

}
