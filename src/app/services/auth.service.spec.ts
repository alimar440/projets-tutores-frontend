import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { MOCK_ENABLED } from './app-settings';
import { mockApiInterceptor } from './mock-api.service';
import { utilisateurInterceptor } from './api.service';

describe('Connexion avec les comptes sénégalais', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [
    { provide: MOCK_ENABLED, useValue: true },
    provideHttpClient(withInterceptors([utilisateurInterceptor, mockApiInterceptor]))
  ] }));

  it('connecte un enseignant et conserve son rôle en mémoire', async () => {
    await TestBed.inject(AuthService).connexion(' MOUSSA.DIOP@gdil.example ', 'Projet2026!');
    expect(TestBed.inject(SessionService).utilisateur()?.prenom).toBe('Moussa');
    expect(TestBed.inject(SessionService).utilisateur()?.role).toBe('ENSEIGNANT');
  });
  it('refuse un mauvais mot de passe sans créer de session', async () => {
    await expectAsync(TestBed.inject(AuthService).connexion('aminata.diallo@gdil.example', 'incorrect')).toBeRejectedWith(jasmine.objectContaining({ status: 401 }));
    expect(TestBed.inject(SessionService).utilisateur()).toBeNull();
  });
  it('refuse un email inconnu', async () => {
    await expectAsync(TestBed.inject(AuthService).connexion('inconnu@gdil.example', 'Projet2026!')).toBeRejectedWith(jasmine.objectContaining({ status: 401 }));
  });
  it('signale le raccordement manquant en mode backend sans simuler une authentification réelle', async () => {
    TestBed.overrideProvider(MOCK_ENABLED, { useValue: false });
    await expectAsync(TestBed.inject(AuthService).connexion('aminata.diallo@gdil.example', 'Projet2026!')).toBeRejectedWith(jasmine.objectContaining({ status: 501 }));
    expect(TestBed.inject(SessionService).utilisateur()).toBeNull();
  });
});
