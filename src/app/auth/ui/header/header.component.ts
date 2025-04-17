import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { toast } from 'ngx-sonner';
import { UiserviceService } from '../uiservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _authStateService = inject(AuthStateService);  
 private _sidebarService = inject(UiserviceService)
  _currentUser = this._authStateService.currentUser?.displayName;
  
  toggleSidebar() {
    this._sidebarService.toggle();
  }

  
}
