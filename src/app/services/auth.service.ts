import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { MOCK_ENABLED } from './app-settings';
import { MOT_DE_PASSE_MOCK } from './mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly session = inject(SessionService);
  private readonly mock = inject(MOCK_ENABLED);

  async connexion(email: string, motDePasse: string): Promise<void> {
    this.session.utilisateur.set(null);
    if (!this.mock) {
      throw new HttpErrorResponse({ status: 501, error: { message: 'La connexion doit être raccordée au service d’authentification du backend.' } });
    }
    const utilisateurs = await firstValueFrom(this.api.utilisateurs());
    const utilisateur = utilisateurs.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!utilisateur || motDePasse !== MOT_DE_PASSE_MOCK) {
      throw new HttpErrorResponse({ status: 401, error: { message: 'Adresse email ou mot de passe incorrect.' } });
    }
    this.session.utilisateur.set(utilisateur);
  }
}
