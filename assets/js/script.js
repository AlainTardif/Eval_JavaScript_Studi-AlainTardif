import { Game } from './models/game.js';
import { Player } from './models/player.js';

// Attendre que le DOM soit chargé pour lancer le jeu
document.addEventListener('DOMContentLoaded', () => {
  // Créer deux joueurs
  const player1 = new Player("1");
  const player2 = new Player("2");

  // Ajouter le deuxième joueur au premier joueur
  player1.addSecondPlayer(player2);

  // Créer une partie de jeu avec les deux joueurs
  const game = new Game(player1, player2);

  // Lancer le jeu
  game.start();
});