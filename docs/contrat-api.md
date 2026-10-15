CONTRAT D’API À RESPECTER

Base : http://localhost:8080/api
Frontend : http://localhost:4200

Les listes sont des tableaux JSON. Les identifiants sont numériques et les dates sont au format ISO 8601.

Rôles :
ADMIN, ENSEIGNANT, ETUDIANT, RESPONSABLE.

Statuts :
EN_ATTENTE, ACCEPTEE, REJETEE.

Objets reçus :

Utilisateur :
{id, nom, prenom, email, role}

Sujet :
{id, titre, description, capaciteMax, ouvert, enseignantId, enseignantNom, placesRestantes, disponible}

Candidature :
{id, etudiantId, etudiantNom, sujetId, sujetTitre, motivation, dateCandidature, statut}

Erreur :
{message}

Routes :

GET /utilisateurs-demo
→ liste des utilisateurs pour la sélection initiale, sans en-tête obligatoire.

GET /etudiants
POST /etudiants
PUT /etudiants/{id}
DELETE /etudiants/{id}
→ ADMIN uniquement.
→ corps POST et PUT : {nom, prenom, email}.

GET /enseignants
POST /enseignants
PUT /enseignants/{id}
DELETE /enseignants/{id}
→ ADMIN uniquement.
→ corps POST et PUT : {nom, prenom, email}.

GET /sujets
→ ADMIN et RESPONSABLE : tous les sujets.
→ ENSEIGNANT : ses sujets.
→ ETUDIANT : les sujets disponibles.

POST /sujets
PUT /sujets/{id}
DELETE /sujets/{id}
→ ENSEIGNANT uniquement, sur ses propres sujets.
→ corps POST et PUT : {titre, description, capaciteMax, ouvert}.

GET /candidatures
→ ETUDIANT : ses candidatures.
→ ENSEIGNANT : les candidatures à ses sujets.
→ RESPONSABLE : toutes les candidatures.
→ ADMIN : accès interdit.

POST /candidatures
→ ETUDIANT uniquement.
→ corps : {sujetId, motivation}.

PATCH /candidatures/{id}/statut
→ RESPONSABLE uniquement.
→ corps : {statut:"ACCEPTEE"} ou {statut:"REJETEE"}.

Ne pas envoyer d’etudiantId ou d’enseignantId dans les formulaires : le backend utilise X-Utilisateur-Id.

Les affectations sont les candidatures ACCEPTEE : pas de route supplémentaire.

POST renvoie 201 avec l’objet créé.
GET, PUT et PATCH renvoient 200 avec les données.
DELETE renvoie 204.
Erreurs : 400 saisie ou utilisateur sélectionné invalide, 403 accès interdit, 404 ressource absente, 409 conflit métier.

