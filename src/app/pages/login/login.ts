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
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  togglePassword() { this.showPassword = !this.showPassword; }

  onLogin() {
    this.errorMessage = '';
    localStorage.removeItem('token');
    
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
