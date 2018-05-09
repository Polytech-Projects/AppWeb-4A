# Dépendances

- NPM (installation comprise avec NodeJS pour windows)
- NodeJS (installation via [lien officiel](https://nodejs.org/en/download/))
- MongoDB (installation via [lien officiel](https://www.mongodb.com/download-center?jmp=nav#community))
- Compass MongoDB (installation via [lien officiel](https://www.mongodb.com/download-center?jmp=nav#compass))

# Installation

## Dépendances

Avoir toutes les dépendances cités plus haut installé.  
Pour la base de donnée MongoDB, créer une table grâce à Compass. Se souvenir du nom de la table.

## Projet

1. Télécharger/cloner le projet
2. Dans la racine projet, modifier le fichier config.js selon votre convenance
3. Dans un terminal
    1. Se placer à la racine du projet
    2. Executer `npm install` (installation des dépendances du package.json)
    3. Lancer le serveur NodeJS `node app.js`
4. Consulter le lien [http://localhost:8095](http://localhost:8095) (Par défaut port 8095, cf. config.js)
