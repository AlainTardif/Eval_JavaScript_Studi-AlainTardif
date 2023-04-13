import { Player } from './player.js';

/* Objet Game : Model d'objet pour créer le jeu */

export class Game {

    //  Constructeur d'un jeu à deux joueurs 
    // Le constructeur prend deux joueurs en paramètre. Si les joueurs ne sont pas fournis, le constructeur en crée deux nouveaux.
    constructor(p1 = null, p2 = null) {
        // je stock le premier joueur si c'est fourni, sinon j'en crée un et je le stock
        this.firstPlayer = p1 ? p1 : new Player(null, true);
        // je stock le deuxième joueur si c'est fourni, sinon j'en crée un et je le stock
        this.secondPlayer = p2 ? p2 : new Player(null, false);
    }


     // Méthode pour initialiser le jeu et les événements
    initGameDOM() {
        
         // je boucle sur tous les joueurs pour afficher leur nom et leur score global
        this.getPlayers().forEach((player) => {
            // Récupère le code HTML correspondant à chaque joueur
            const code = ["One", "Two"][player.getPosition()];

            player.resetScore()
            // Affiche le score global de chaque joueur
            document.getElementById("player" + code + "GlobalValue").innerText = 0;

            // Affiche le score temporaire de chaque joueur
            document.getElementById("player" + code + "RoundValue").innerText = 0;

             // Affiche le nom de chaque joueur
            const playerClass = "player" + (player.getPosition() + 1);
            document.querySelector("." + playerClass + " h2").innerText = player.getName();

        });

        document.querySelector('.modal').style.display = "none"

        
        //détection et gestion du click sur le bouton qui permet de lancer le dé
        document.getElementById("rollDice").onclick = this.handleClickRollDice.bind(this);

        //détection et gestion du click sur le bouton qui permet de changer de main
        document.getElementById("hold").onclick = this.handleClickHold.bind(this);

        //détection et gestion du click sur le bouton qui permet relancer le jeu
        document.getElementById("newGame").onclick = this.resetGame.bind(this);

        //initialisation de l'image du dé
        document.querySelector(".imgCenter img").src = "assets/img/dice1.png";

         // Cache la fenêtre modale lorsqu'on clique sur la zone de contenu et réinitialise les scores
        document.querySelector('.modal .modal-content').addEventListener('click', () => {
        // Cache la fenêtre modale
        document.querySelector('.modal').style.display = 'none';
        
        // Réinitialise les scores des joueurs
        this.firstPlayer.resetScore();
        this.secondPlayer.resetScore();
        
        // Met à jour l'affichage du jeu
        this.updateDOM();

        // Réinitialise l'image du dé à 1
        document.querySelector(".imgCenter img").src = "assets/img/dice1.png";
    });

    }

     // Méthode pour commencer le jeu
    start(){
        //  j'initialise l'affichage du jeu dans la page
        this.initGameDOM();
    }

     // Méthode pour récupérer les joueurs
    getPlayers() {
        return [this.firstPlayer, this.secondPlayer]
    }

    // Méthode pour gérer le clic sur le bouton qui permet de lancer le dé
    handleClickRollDice() {
        this.getCurrentPlayer().play();
        this.updateDOM();
    }

    // Méthode pour récupérer le joueur gagnant
    getWinner(){
        if(this.firstPlayer.isWin()){
            return this.firstPlayer
        }
        if(this.secondPlayer.isWin()){
            return this.secondPlayer
        }
        return null
    }

   // Méthode pour gérer le clic sur le bouton qui permet de changer de main
handleClickHold() {
    // Je fais appel à la méthode hold() du joueur courant
    this.getCurrentPlayer().hold();
    // J'actualise l'affichage du jeu
    this.updateDOM();
    // Joue le son de succès
    // this.audios("success");
    // Si un joueur a gagné, j'affiche le message de victoire dans une modal
    if (this.firstPlayer.isWin() || this.secondPlayer.isWin()) {
        // Modifie le texte affiché pour inclure le nom du joueur gagnant
        document.querySelector('.modal #winner').innerText = "Bravo "+this.getWinner().getName().split(" : ")[1]+" Vous avez gagné cette manche !"
        // Affiche la modal
        const modalElement = document.querySelector('.modal');
        modalElement.style.display = "block";
        // document.querySelector('.modal').style.display = "block";
    } 
 }
 

    // Méthode pour réinitialiser le jeu
    resetGame() {
        // Réinitialise l'affichage du jeu
        this.initGameDOM();
        // Réinitialise l'image du dé
        document.querySelector(".imgCenter img").src = "assets/img/dice1.png";
    }

    
    getCurrentPlayer() {
        return this.firstPlayer.isCurrentPlayer
            ? this.firstPlayer
            : this.secondPlayer;
    }


    // Méthode pour mettre à jour l'affichage du jeu
    updateDOM() {
        // Je boucle sur tous les joueurs pour mettre à jour leur score global et leur score temporaire
        this.getPlayers().forEach((player) => {
            const code = ["One", "Two"][player.getPosition()];
            // Met à jour le score global de chaque joueur
            document.getElementById("player" + code + "GlobalValue").innerText = player.getScoreGlobal();
            // Met à jour le score temporaire de chaque joueur
            document.getElementById("player" + code + "RoundValue").innerText = player.getScoreRound();

            // Modifie la classe CSS pour aficher le joueur courant en gras 
            const playerClass = "player" + (player.getPosition() + 1)

            if (player.isCurrentPlayer) {
                document.querySelector("." + playerClass + " h2").classList.add("current")
            } else {
                document.querySelector("." + playerClass + " h2").classList.remove("current")
            }

        });

        // Met à jour l'image du dé en fonction du score courant du joueur courant
        const imageName = "dice" + Player.scoreCurrent + ".png";
        document.querySelector(".imgCenter img").src = "assets/img/" + imageName;
    }
}