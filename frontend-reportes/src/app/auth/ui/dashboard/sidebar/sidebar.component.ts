import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { UiserviceService } from '../../uiservice.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit  {
  private _authState = inject(AuthStateService)
    private _router = inject(Router)
    private _sidebarService = inject(UiserviceService)
    isSidebarOpen = false
    
    constructor(){
      
    }
    ngOnInit() {
      this._sidebarService.isOpen$.subscribe(isOpen => {
        this.isSidebarOpen = isOpen;
      });
    }
  
    toggleSidebar() {
      this._sidebarService.toggle();
    }    

    async logOut() {
        await this._authState.logOut()
        this._router.navigateByUrl("/auth/sign-in")
    }
}
