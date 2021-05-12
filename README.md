# MonitoringSearchEngine

Ceci est un module de recherche appliqué à la base de données
remplie préalablement par le contenu de fichiers PDF.

Ce module Web est développé en
NodeJS/knex/Postgres pour le backend
et
Javasript/HTML/CSS/BootSwatch pour le frontend




Pour l'intégration de ce module, vous devez :

  - Modifier les variables d'identification à la BDD dans le fichier d'environnement
  - Dans le même fichier, renseigner le port souhaité pour la BDD puis pour son outils d'administration.
  - Dans le fichier ./backend/src/index.js , renseigner le port souhaité pour l'API Express.
  - Dans le même fichier, renseigner votre clé Google API traduction
  - Télécharger toutes les dépendance en lançant la commande suivante:
    npm i

  - Télécharger Docker : https://www.docker.com/
  - Télécharger les images docker suvantes sur l'environnement en utilisant docker pull:
    - adminer
    - postgres
  - Vous pouvez ensuite allumer les contenaires Docker configurés sur ce projet en tapant la commande suivante : docker-compose up
    (docker-compose down pour l'effet inverse)
  - Il faut ensuite monter la BDD en tapant la commande :
    npm run migrate
  - Il faut maintenant remplir les premières données ainsi que celles qui ne bougents pas :
    npm run seed
