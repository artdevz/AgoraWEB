import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {

  userId = '';
  banUserId = '';

  role: 'USER' | 'MOD' = 'USER';

  message = '';

  constructor(private userService: UserService) {}

  updateRole() {
    this.userService.updateRole(this.userId, this.role).subscribe({
      next: () => this.message = 'Cargo atualizado com sucesso!',
      error: () => this.message = 'Erro ao atualizar cargo.'
    });
  }

  ban() {
    this.userService.ban(this.banUserId).subscribe({
      next: () => this.message = 'Usuário banido com sucesso!',
      error: () => this.message = 'Erro ao banir usuário.'
    });
  }

  unban() {
    this.userService.unban(this.banUserId).subscribe({
      next: () => this.message = 'Usuário desbanido com sucesso!',
      error: () => this.message = 'Erro ao desbanir usuário.'
    });
  }

}