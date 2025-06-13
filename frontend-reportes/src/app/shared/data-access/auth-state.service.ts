import { inject, Injectable } from "@angular/core";
import { Auth, authState, signOut, getAuth } from "@angular/fire/auth";
import { toast } from "ngx-sonner";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class AuthStateService{
    private _auth =inject(Auth);
    get authState(): Observable<any> {
        return authState(this._auth);
    }
    get currentUser(){
        return getAuth().currentUser;
    }

    logOut(){
        toast.success('Se ha cerrado la sesión');
        return signOut(this._auth);
    }
}