import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  nickname = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  showPassword = false;
  showConfirmPassword = false;

  passwordStrength = 0;
  passwordLabel = '';
  passwordColor = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirmPassword() { this.showConfirmPassword = !this.showConfirmPassword; }

  get canRegister() {
    return (
      this.nickname.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.password.length <= 32 &&
      this.passwordStrength >= 5
    );
  }

  onRegister() {
    this.errorMessage = '';

    if (!this.nickname || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Preencha todos os campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    this.auth.register(this.nickname, this.email, this.password).subscribe({
      next: (response) => {
        if (!response.token) return;

        this.auth.saveToken(response.token);
        this.router.navigate(['']);
      },
      error: () => {
        this.errorMessage = 'Erro ao registrar usuário';
        this.cd.detectChanges();
      }
    });
  }

  checkPasswordStrength() {
    const password = this.password;
    let score = 0;

    if (!password) {
      this.passwordStrength = 0;
      this.passwordLabel = '';
      return;
    }

    if (password.length >= 8 && password.length <= 32) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    this.passwordStrength = score;

    if (score <= 2) {
      this.passwordLabel = 'Fraca';
      this.passwordColor = '#d00000';
    } else if (score <= 4) {
      this.passwordLabel = 'Moderada';
      this.passwordColor = '#ff8800';
    } else {
      this.passwordLabel = 'Forte';
      this.passwordColor = '#00a000';
    }
  }

}
