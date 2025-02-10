# GestionInventaire

Un système qui permet aux utilisateurs de scanner un QR code pour consulter, ajouter ou modifier les stocks d'un produit directement depuis une interface.

## Backend (PHP & MySQL)

- Créer une base de données `inventaire`
- Table `products` avec les colonnes : `{ id, nom, quantite, prix, url_img, qr_code }`
- Écrire une API PHP pour :
  - Ajouter un produit
  - Récupérer la liste des produits
  - Modifier un produit
  - Supprimer un produit
  - Générer un QR code produit
  - Récupérer un produit via son QR code

## Frontend (React)

- **Page de gestion** : Tableau affichant les produits
- **Formulaire** : Ajout et modification de produit
- **Scanner QR codes** : Accéder aux produits via QR code
- **Connexion API Backend** 
- **QR Code Scanner** : Récupération des données

## Technologies utilisées

- **Backend** : PHP, MySQL
- **Frontend** : React.js
