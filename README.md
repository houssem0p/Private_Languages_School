# Private Languages School

Projet web Fullstack : **Frontend React (Vite)** + **Backend PHP** + **MySQL**.

---

## Prérequis

- XAMPP (Apache + MySQL)
- Node.js + npm

---

## Installation

1. **Base de données**
   - Créer une DB dans phpMyAdmin : `global_speak_database`
   - Importer le fichier SQL fourni.

2. **Backend**
   - Copier `backend/` dans `C:\xampp\htdocs\Private_Languages_School\backend`
   - Vérifier `config/db.php` pour la connexion à MySQL
   - Ajouter CORS en haut de chaque fichier PHP :
     ```php
     header("Access-Control-Allow-Origin: *");
     header("Content-Type: application/json");
     ```

3. **Frontend**
   - Ouvrir PowerShell dans `frontend/`
   - Installer les dépendances :
     ```bash
     npm install
     ```
   - Créer `.env` :
     ```
     REACT_APP_API_URL=http://localhost/Private_Languages_School/backend
     ```
   - Lancer le frontend :
     ```bash
     npm run dev
     ```

---

## Utilisation

- Pages disponibles : Courses, Favorites, Login, Signup
- Les données sont chargées depuis l’API PHP
- Les favoris et inscriptions fonctionnent via l’API

---

## Notes

- Toujours redémarrer Vite après modification du `.env`
- Vérifier que les fichiers PHP et la DB existent
