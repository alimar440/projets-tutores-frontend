# Vérifications — 15 octobre 2026

## Effectuées

- Version Angular 19.2 conservée, sans nouvelle dépendance.
- `npm.cmd run build` : compilation de production réussie, sans dépassement des budgets.
- `npm.cmd test -- --watch=false --browsers=ChromeHeadless` : 20 tests réussis sous Chrome Headless.
- Connexion mock : compte valide, normalisation de l’email, refus d’un mauvais mot de passe ou d’un compte inconnu, absence de session après échec ; signalement explicite de l’authentification backend à raccorder.
- Tests : affichage initial, en-tête utilisateur et exclusion des requêtes externes, corps POST de candidature, PATCH de décision, restitution du message métier, capacité entière positive, motivation non vide, candidature rejetée reconnue, gardes de rôle, rechargement des candidatures et places après décision.
- Mode mock : parcours HTTP de création de sujet, candidature, acceptation et suivi entre profils ; vérification des places et des restrictions par rôle ; ajout, modification et suppression d’un étudiant ; refus d’une deuxième candidature même après rejet.
- Parcours complet dans Chrome avec les comptes sénégalais : connexion de Moussa Diop, création d’un sujet, déconnexion et connexion d’Aminata Diallo, candidature, connexion de Cheikh Seck, acceptation, reconnexion de l’étudiante et consultation du résultat.
- Réinitialisation des données et de la session après rafraîchissement vérifiée dans Chrome.
- Captures examinées sur ordinateur (1440 px) et téléphone (390 px) ; absence de débordement horizontal de la page vérifiée sur la connexion et les candidatures. Les tableaux défilent dans leur conteneur. Pictogramme de marque, badge de démonstration et avatars à initiales retirés.
- Présentation finale : menu bleu nuit, fond gris perle, cartes claires, boutons bleus et typographie harmonisée. Photo de fond et bordure latérale du lien actif supprimées. Cartes de sujets simplifiées, descriptions de page ajoutées et formulaire de connexion centré. Captures ordinateur et téléphone examinées ; compilation et parcours navigateur réussis après cette refonte.
- Recherche dans le code applicatif : aucun `any`, `localStorage` ou `sessionStorage`.
- Deux tentatives de `GET http://localhost:8080/api/utilisateurs-demo`, dont une hors restrictions réseau : connexion impossible.

La compilation a nécessité l’accès en lecture aux dossiers parents pour la résolution des dépendances. Les tests ont nécessité le lancement de Chrome Headless.

## Limites

Le backend étant inaccessible, aucun parcours avec Spring Boot n’a été exécuté et aucune donnée n’a été créée sur le serveur. À la demande de l’utilisateur, un mode mock est maintenant activé par défaut : données et modifications restent uniquement en mémoire. Les règles de démonstration devront être comparées aux règles définitives du backend, notamment les conflits et suppressions.

L’architecture distingue `pages` (écrans et formulaires), `components` (en-tête, menu, cartes, icônes) et `services` (HTTP, session, données mock). Les templates sont dans des fichiers HTML. Le contrat API est conservé pour le futur branchement.

La connexion email/mot de passe a été ajoutée à la demande de l’utilisateur. Elle est simulée côté frontend pour le moment. Le contrat initial ne prévoit aucune route d’authentification ; cette extension devra être définie avec le backend et raccordée dans `AuthService`. En mode API réelle, la connexion reste bloquée avec un message explicite tant que ce raccordement n’est pas réalisé.

## Parcours à réaliser avec Spring Boot

1. Définir et raccorder l’authentification backend, démarrer le backend et le frontend, puis vérifier la connexion.
2. Se connecter en enseignant, créer un sujet ouvert de capacité 1 et vérifier sa présence dans ses sujets.
3. Changer pour un étudiant, ouvrir ce sujet, saisir une motivation et envoyer la candidature.
4. Vérifier « Déjà candidaté » et le statut En attente dans les candidatures de l’étudiant.
5. Changer pour l’enseignant et vérifier la candidature et sa motivation.
6. Changer pour le responsable, accepter la candidature et vérifier le statut Acceptée et les places restantes à 0.
7. Vérifier que cette candidature apparaît dans Affectations et que les boutons de décision ont disparu.
8. Revenir à l’étudiant et vérifier le résultat dans Mes candidatures.
9. Sur un autre sujet ouvert, vérifier le rejet puis « Déjà candidaté » pour cet étudiant même après rejet.
10. En ADMIN, vérifier ajout, modification et suppression des étudiants et enseignants ; tester une suppression annulée et un conflit métier éventuel.
11. Vérifier les listes vides, erreurs backend, saisies invalides et l’affichage sur une largeur de téléphone.

Le backend et le contrat d’API n’ont pas été modifiés.
