# Gestion des projets tutorés — Master 2 GDIL

Frontend Angular 19.2 connecté au backend Spring Boot de [mbackeCISSE/backend](https://github.com/mbackeCISSE/backend).
Les appels réels sont activés par défaut : connexion, gestion des utilisateurs, sujets, candidatures et décisions.

## Installer et lancer

Prérequis : Node.js compatible Angular 19 (par exemple Node 22), Java 21 ou supérieur, et MySQL 8.0.16 ou supérieur.
Docker Desktop peut fournir MySQL sans installation manuelle.

Les deux dépôts se trouvent côte à côte :

    projet_dev_multitier/
      backend/
      frontend/

Si le backend n’est pas encore présent, depuis le dossier parent :

    git clone https://github.com/mbackeCISSE/backend.git backend

### 1. Démarrer MySQL

Depuis frontend, avec Docker Desktop démarré :

    docker compose -f compose.mysql.yaml up -d
    docker compose -f compose.mysql.yaml ps

Le service doit devenir healthy. MySQL écoute sur 127.0.0.1:3307 et conserve les données dans un volume Docker.
Les identifiants ci-dessous sont réservés à cette base locale de démonstration.

### 2. Démarrer Spring Boot

Dans un terminal PowerShell, depuis backend :

    $env:DB_URL = 'jdbc:mysql://localhost:3307/projets_tutores?createDatabaseIfNotExist=true&serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false'
    $env:DB_USERNAME = 'root'
    $env:DB_PASSWORD = 'ProjetsLocal2026!'
    .\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=demo"

Vérifier que JAVA_HOME désigne un JDK 21 ou supérieur. Sur le poste utilisé pour l’intégration, il pointait initialement vers Java 17 ; le JDK disponible a été sélectionné pour le terminal de lancement :

    $env:JAVA_HOME = 'C:\Program Files\Java\jdk-26.0.1'

Adapter ce chemin à votre installation. Ces variables ne modifient que le terminal courant.
Si vous avez déjà MySQL, utilisez votre DB_URL, DB_USERNAME et DB_PASSWORD au lieu du service Docker.

L’API est disponible sur http://localhost:8080/api.
Le profil demo initialise les comptes et leurs mots de passe BCrypt sans écraser les empreintes existantes.

### 3. Démarrer Angular

Dans un autre terminal, depuis frontend :

    npm install
    npm start

Sous PowerShell, utiliser npm.cmd si npm.ps1 est bloqué.
Ouvrir exactement http://localhost:4200 : cette origine est autorisée par le backend.
Aucun proxy ni cookie de connexion n’est nécessaire.

## Comptes de démonstration

Mot de passe commun : Projet2026!

| Rôle | Nom | Email |
| --- | --- | --- |
| Administrateur | Fatou Ndiaye | fatou.ndiaye@gdil.example |
| Enseignant | Moussa Diop | moussa.diop@gdil.example |
| Enseignante | Awa Fall | awa.fall@gdil.example |
| Étudiante | Aminata Diallo | aminata.diallo@gdil.example |
| Étudiant | Ibrahima Sarr | ibrahima.sarr@gdil.example |
| Étudiante | Mariama Ba | mariama.ba@gdil.example |
| Responsable | Cheikh Seck | cheikh.seck@gdil.example |

Les comptes réellement présents proviennent de MySQL. Les identifiants ne sont pas codés en dur côté Angular.
En profil demo, un étudiant ou enseignant créé par l’admin reçoit aussi le mot de passe initial Projet2026!.

## Connexion et données

AuthService appelle POST /api/auth/connexion avec {email, motDePasse}. Le backend renvoie {id, nom, prenom, email, role}.
Angular conserve cet utilisateur uniquement en mémoire et ajoute X-Utilisateur-Id aux requêtes métier.
La connexion ne dépend pas de GET /utilisateurs-demo.

Se déconnecter ou rafraîchir la page efface la session Angular ; les données métier restent dans MySQL.
Il s’agit toujours de la simulation locale prévue par le backend : aucun JWT ni session serveur, et l’en-tête peut être falsifié.

- ADMIN : étudiants, enseignants et consultation des sujets.
- ENSEIGNANT : gestion de ses sujets et consultation de leurs candidatures.
- ETUDIANT : sujets disponibles, candidature et suivi des résultats.
- RESPONSABLE : décisions et affectations obtenues en filtrant les candidatures acceptées.

L’adresse du backend est définie dans src/app/services/api.service.ts.
Les erreurs HTTP du backend sont affichées ; une indisponibilité ne déclenche aucun repli automatique sur les mocks.

## Mode mock facultatif

Les mocks restent disponibles pour travailler hors ligne. Dans src/app/app.config.ts, passer MOCK_ENABLED à true.
Laisser false pour utiliser Spring Boot. La connexion utilise la même route dans les deux modes.

Les données fictives de src/app/services/mock-data.ts et les modifications du mode mock restent uniquement en mémoire.
Elles ne sont jamais synchronisées avec MySQL et disparaissent au rafraîchissement.

## Vérifications et arrêt

    npm run build
    npm test -- --watch=false --browsers=ChromeHeadless

Dans backend :

    .\mvnw.cmd package

Voir [les vérifications réellement effectuées](docs/verification.md), [le contrat du backend](docs/contrat-api.md) et [les captures du rapport](docs/captures-rapport.md).

Pour arrêter Angular ou Spring Boot, utiliser Ctrl+C dans leurs terminaux.
Pour arrêter MySQL sans supprimer les données :

    docker compose -f compose.mysql.yaml stop

## Organisation

- models : interfaces et libellés français.
- services : API HTTP, connexion, session et mocks facultatifs.
- guards : accès aux routes selon le rôle.
- pages : connexion, utilisateurs, sujets et candidatures.
- components : en-tête, menu, cartes de sujets et icônes.
