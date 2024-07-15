# HRnet

# HRNet est une application de gestion des employés permettant de créer et de lister les informations des employés. Cette application utilise React pour la construction de l'interface utilisateur et des bibliothèques React spécifiques pour certaines fonctionnalités comme la sélection de dates et les menus déroulants.

# Fonctionnalités Principales
1. Création d'Employés : Un formulaire permettant d'ajouter les informations des employés (prénom, nom, date de naissance, date de début, département, adresse, etc.).
2. Liste des Employés : Affiche une liste paginée des employés enregistrés dans le    localStorage.
3. Pagination : Les listes d'employés peuvent être parcourues page par page.
4. Sélection de Dates : Utilisation de react-datepicker pour sélectionner les dates.
5. Menus Déroulants : Utilisation de react-select pour les champs de sélection.

# Prérequis
Node.js et npm installés sur votre machine.
Installation
Clonez le dépôt du projet :

# git clone <https://github.com/AhmaduLo/projet-14.git>
cd P12_Front-end
et dans 
cd .\hrnet-react\

# Installez les dépendances :

npm install

# Démarrage
Pour lancer l'application en mode développement : npm start

# Ouvrez http://localhost:3000 pour voir l'application dans votre navigateur.

# Structure du Projet
. src/
. components/
. Formulaire.js : Composant pour le formulaire de création d'employés.
. ListeeEmployer.js : Composant pour l'affichage de la liste des employés avec . pagination.
. Header.js : Composant pour l'en-tête de l'application.
. Footer.js : Composant pour le pied de page de l'application.
. StateSelect.js : Composant pour le champ de sélection des états.
. App.js : Composant principal de l'application.
. App.css : Styles généraux de l'application.
. index.js : Point d'entrée de l'application.

# Utilisation des Composants
Formulaire de Création d'Employés
Le composant Formulaire permet de saisir les informations d'un employé et de les sauvegarder dans le localStorage. Après la sauvegarde, un message de confirmation est affiché.

# Liste des Employés
Le composant ListeeEmployer affiche la liste des employés sauvegardés dans le localStorage. Il inclut la pagination pour naviguer entre les pages de la liste.


# Contribution
Les contributions sont les bienvenues ! Veuillez soumettre une issue ou une pull request pour proposer des améliorations ou des corrections.

# Installez et utilisez mon package

 npm install hrnet-react

 # Ensuite, vous pouvez l'importer et l'utiliser

 import HrnetReact from 'hrnet-react';