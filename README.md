# Gestion des projets tutorés — Master 2 GDIL

Frontend Angular 19.2, en français, avec formulaires réactifs, HttpClient et routes par rôle.

## Installer et lancer

Prérequis : Node.js compatible Angular 19 (par exemple Node 22) et npm.

```sh
npm install
npm start
```

Sous PowerShell, utiliser `npm.cmd` si la politique bloque `npm.ps1`.
Ouvrir http://localhost:4200. Le mode mock est activé par défaut : aucun backend n’est nécessaire.

## Données de démonstration et passage au backend

Les profils, sujets et candidatures sont définis dans `src/app/services/mock-data.ts`. Les actions de création, modification, suppression et décision fonctionnent en mémoire. Les changements sont conservés lors du changement de profil et réinitialisés au rafraîchissement. Aucun stockage local n’est utilisé.

Pour brancher les API métier Spring Boot, remplacer `useValue: true` par `useValue: false` pour `MOCK_ENABLED` dans `src/app/app.config.ts`, puis démarrer le backend sur http://localhost:8080.

La page de connexion utilise actuellement une vérification mock dans `services/auth.service.ts`. Le contrat fourni ne définit aucune route de connexion : il faudra convenir de cette route et du mécanisme de session avec le développeur backend, puis raccorder ce service. En mode backend, une erreur explicite empêche de présenter la connexion mock comme une authentification réelle. Aucune route backend n’a été inventée ou modifiée.

Le backend doit autoriser par CORS l’origine http://localhost:4200, les méthodes GET, POST, PUT, PATCH, DELETE et l’en-tête `X-Utilisateur-Id`, avec les prévols OPTIONS. Le contrat fourni reste inchangé ; les règles du mock restent à comparer aux règles métier définitives du backend.

## Utilisation

Saisir l’email et le mot de passe d’un compte ci-dessous. La session reste uniquement en mémoire ; un rafraîchissement ou « Se déconnecter » l’efface. Les gardes adaptent les accès du frontend ; le backend devra aussi contrôler les autorisations.

Comptes fictifs, avec le mot de passe commun `Projet2026!` :

| Rôle | Nom | Email |
| --- | --- | --- |
| Administrateur | Fatou Ndiaye | fatou.ndiaye@gdil.example |
| Enseignant | Moussa Diop | moussa.diop@gdil.example |
| Enseignante | Awa Fall | awa.fall@gdil.example |
| Étudiante | Aminata Diallo | aminata.diallo@gdil.example |
| Étudiant | Ibrahima Sarr | ibrahima.sarr@gdil.example |
| Étudiante | Mariama Ba | mariama.ba@gdil.example |
| Responsable | Cheikh Seck | cheikh.seck@gdil.example |

Les sujets évoquent les stages à Dakar, les salles à Saint-Louis et le suivi énergétique d’un campus de Thiès. Les personnes, comptes et projets sont fictifs. Le mot de passe mock est public et destiné uniquement aux essais locaux.

- ADMIN : gérer les étudiants et enseignants, consulter les sujets.
- ENSEIGNANT : gérer ses sujets, consulter leurs candidatures.
- ETUDIANT : consulter les sujets disponibles, candidater et suivre les résultats.
- RESPONSABLE : décider des candidatures en attente et consulter les affectations.

Les pages utilisent toujours le même service HTTP. En mode démonstration, un intercepteur transmet les requêtes au service mock. En mode réel, elles sont envoyées à l’API REST. L’adresse API est définie dans `src/app/services/api.service.ts`. Les affectations filtrent les candidatures acceptées.

## Vérifier

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

Les tests HTTP utilisent les outils de test Angular et ne remplacent pas une validation avec Spring Boot. Voir [les vérifications et le parcours d’intégration](docs/verification.md), [le contrat API](docs/contrat-api.md) et [les captures pour le rapport](docs/captures-rapport.md).

## Organisation

- `models` : interfaces et libellés français.
- `services` : API, intercepteur et session en mémoire.
- `guards` : contrôle des routes par rôle.
- `pages` : connexion, gestion des personnes, sujets et candidatures.
- `components` : en-tête, menu latéral, carte de sujet et icônes réutilisables.
