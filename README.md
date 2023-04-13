# eval_studi_javascript

## Objectif

Création d'un petit jeu sur navigateur web à l'aide du DOM.

## Livrables attendus

1. Un jeu fonctionnel
2. Une interface lisible qui correspond à la maquette fournie

## Fonctionnalités globales

Côté client front-end

- Créer une nouvelle partie
- Retenir le score courant
- Lancer le dé
- Gérer 2 joueurs

## Règles du jeu

Le jeu se joue avec 2 joueurs sur un seul écran. Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).

Déroulement d'un tour

1. Le joueur a son ROUND initialisé à 0
2. Le joueur peut lancer le dé autant de fois qu'il le souhaite, avec le résultat de chaque lancer ajouté à son ROUND
3. Le joueur peut décider à tout moment de :
    - Cliquer sur l'option "Hold", ce qui envoie les points du ROUND vers le GLOBAL et passe le tour à l'autre joueur
    - Lancer le dé ; s'il obtient un 1, son score ROUND est perdu et c'est la fin de son tour
Le premier joueur qui atteint 100 points sur GLOBAL gagne le jeu.

## Contexte du projet

Le but est de développer un jeu simple et amusant pour les navigateurs web, en utilisant les compétences acquises sur la manipulation du DOM. Le jeu doit être accessible et intuitif, permettant aux utilisateurs de s'amuser rapidement sans avoir besoin d'apprendre des règles compliquées

Alain Tardif
