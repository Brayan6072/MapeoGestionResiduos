import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
})

export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);

  }
  isEmailRequired() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', 
      Validators.required),
  });

  async submit() {
    if (this.form.invalid) return; 
    
    try{
      const {email, password} = this.form.value; 
    
      if(!email || !password) return;
    
      await this._authService.signIn({email, password});
      toast.success('Hola nuevamente');
      this._router.navigate(['/dashboard']);
    }catch(error){
      
      toast.error('error al iniciar con tu usuario');
    }
  }
  
  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Usuario creado con exito');
      this._router.navigate(['/dashboard']);
    }
    catch (error) {
      toast.error('error al crear usuario');
    }
  }
}
