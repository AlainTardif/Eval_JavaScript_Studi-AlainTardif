import { LOSE_SCORE, MAX_SCORE } from "../variables/constant.js";

/* Objet Player : Model d'objet pour créer des joueurs */
export class Player {
    
    static position = 0

    // résultats du dernier dé lancé 
    static scoreCurrent = 1

    /**
     * constructeur d'un joueur
     * @param {String} name - Le nom du joueur 
     * @param {Player} secondPlayer - Le second joueur 
     * @param {Boolean} isCurrentPlayer - le status du joueur 
     */
    constructor(name = "",secondPlayer = {}, isCurrentPlayer = false) {

        // score global du joueur
        this.scoreGlobal = 0;

        // incrémenter la position pour compter le nombre de joueur créé
        Player.position ++;

        //le nom du joueur
        this.name = name ? "Joueur : "+name : "Joueur "+Player.position;

        //score temporaire du joueur
        this.scoreRound = 0;

        

        // position d'affichage du joueur sur la page (interface graphique) de jeu
        this.position = Player.position - 1;

        // le second joueur
        this.secondPlayer = secondPlayer;

        
        //   Status du joueur
        //   true : si c'est le tour de jeu du joueur 
        //   false : si ce n'est pas le tour de jeu du joueur
         
        this.isCurrentPlayer = isCurrentPlayer;
    }

    
    //   Méthode qui permet de récupérer le nom du joueur
    //   @returns {String} - Nom du joueur
     
    getName(){
        return this.name
    }

 
    // Méthode pour modifier le nom du joueur
    // @param {String} name - Le nouveau nom du joueur
    // @returns {Player} - Le joueur
   
    setName(name){
        this.name = name
        return this
    }


    // La méthode pour jouer (lancer le dé)
    // @returns { void } - Rien


    play() {
        if (this.isCurrentPlayer) {
            // on génère un nombre aléatoire entre 1 et 6
            const value = Math.floor(Math.random() * 6) + 1;

            // on stocke la valeur du dé
           Player.scoreCurrent = value;

            if (LOSE_SCORE.includes(value)) {
                //le tour est perdu par le joueur courant
                this.scoreRound = 0;

                //on change de joueur
                this.changePlayer();
            } else {
                // on stock la valeur du dé dans scoreRound
                this.scoreRound += value;

                // on joue le son de succès
                // this.audios("success");
                
            }

        }
    }

    // Méthode pour réinitialiser le score
    // @returns {void} - Rien

    resetScore(){
        // score global du joueur
        this.scoreGlobal = 0;
        //score temporaire du joueur
        this.scoreRound = 0;
        // résultats du dernier dé lancé 
        this.scoreCurrent = 0;
    }


    // Permet de récupérer le score global du joueur
    // @returns { Number } - le score global du joueur

    getScoreGlobal() {
        // retourne le score global
        return this.scoreGlobal;
    }

   
    // Permet de récupérer le score temporaire du joueur
    // @returns { Number } - le score temporaire du joueur
    
    getScoreRound() {
        // retourne le score temporaire
        return this.scoreRound;
    }

    
    // Permet de récupérer le score courant du joueur
    // @returns { Number } - le score courant du joueur
   
    getScoreCurrent() {
        // retourne le score courant du joueur
        return this.scoreCurrent;
    }

    
    // Permet de récupérer le status du joueur
    // @returns { Boolean } - le status du joueur
    
    getIsCurrentPlayer() {
        // retourne le status du joueur
        return this.isCurrentPlayer;
    }

    
    // Permet de récupérer la position du joueur
    // @returns { Number } - la position du joueur
     
    getPosition() {
        // retourne la position du joueur
        return this.position;
    }

    
    // @returns { void } - Rien
    // Permet au joueur de passer la main au second joueur 
     
    hold() {
        // on stock le score global
        this.scoreGlobal += this.scoreRound;

        // on réinitialise à 0 le score temporaire
        this.scoreRound = 0;

        // on réinitialise à 0 la valeur du dernier dé
        this.scoreCurrent = 0;

        // on change de joueur 
        this.changePlayer();
    }

    
    //   Permet de changer le joueur
    //   @returns { void } - Rien
     
    changePlayer() {
        this.isCurrentPlayer = false;
        this.secondPlayer.isCurrentPlayer = true;
    }

    
    // Permet d'ajouter un second joueur
    // @param { Player } player - un joueur
    // @returns { void } - Rien
     
    addSecondPlayer(player) {
        this.secondPlayer = player;
        player.secondPlayer = this;
        if(!this.isCurrentPlayer && !player.isCurrentPlayer){
            this.isCurrentPlayer = true;
        }
    }

    
    // Permet de récupérer le second joueur
    // @returns { Player } - le second joueur
     
    getSecondPlayer() {
        return this.secondPlayer;
    }

    
    // Permet de savoir si le joueur a gagné le jeu ou non
    // @returns { Boolean } - true: si le joueur a gagné, false : sinon
     
  isWin() {
        return this.scoreGlobal >= MAX_SCORE;
    }
}