document.addEventListener('DOMContentLoaded', function() {

    let boutonOuvrir = document.getElementById('open_bouton');
    let conteneur = document.getElementById('conteneur');
    let boutonFermer = document.querySelector('.closePopup');
  
    boutonOuvrir.addEventListener('click', function() {
      conteneur.classList.add('visible');
    });
  
    boutonFermer.addEventListener('click', function() {
      conteneur.classList.remove('visible');
    });
  });
  
  
  
  