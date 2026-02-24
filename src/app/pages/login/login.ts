import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  onLogin() {
    this.errorMessage = '';
    
    this.auth.login(this.email, this.password)
      .subscribe({
        next: (response) => {
          if (!response.token) return;

          this.auth.saveToken(response.token);
          this.router.navigate(['']);
        },
        error: () => {
          this.errorMessage = "Credenciais inválidas";
          this.password = '';
          this.cd.detectChanges();
        }
      });
  }
}
