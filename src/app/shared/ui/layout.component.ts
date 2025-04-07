import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthStateService } from "../data-access/auth-state.service";
import { FooterComponent } from "../../auth/ui/footer/footer.component";
import { HeaderComponent } from "../../auth/ui/header/header.component";
import { SidebarComponent } from "../../auth/ui/sidebar/sidebar.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    standalone : true,
    selector: "app-layout",
    imports: [RouterModule, ReactiveFormsModule, FooterComponent, HeaderComponent, SidebarComponent],
    templateUrl: './layout.component.html',    
})
  
export default class LayoutComponent {
    private _authState = inject(AuthStateService)
    private _router = inject(Router)

    async logOut() {
        await this._authState.logOut()
        this._router.navigateByUrl("/auth/sign-in")
    }
}