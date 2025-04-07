import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private _authState = inject(AuthStateService)
    private _router = inject(Router)

    async logOut() {
        await this._authState.logOut()
        this._router.navigateByUrl("/auth/sign-in")
    }
}
