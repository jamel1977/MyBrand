// Sélectionne tous les éléments qui correspondent au sélecteur '.card .btn'.
// querySelectorAll retourne une NodeList statique de tous les éléments trouvés.
const buttons = document.querySelectorAll('.card .btn');


// Fonction showModal : crée et affiche un modal simple.
// title : texte du titre, text : description à afficher, trigger : bouton qui a déclenché l'ouverture.
function showModal(title, text, trigger){
  // createElement crée un nouvel élément DOM <div> qui servira d'overlay (fond sombre).
  const overlay = document.createElement('div');
  // on assigne une classe pour pouvoir styler l'overlay via CSS.
  overlay.className = 'simple-modal-overlay';

  // création de la fenêtre modale (conteneur blanc).
  const modal = document.createElement('div');
  modal.className = 'simple-modal';

  // création du bouton de fermeture (la croix).
  // createElement('button') crée un bouton HTML.
  const close = document.createElement('button');
  // on lui donne une classe pour le positionner et le styliser en CSS.
  close.className = 'simple-modal-close';
  // textContent définit le texte affiché à l'intérieur de l'élément (sans parser du HTML).
  close.textContent = '✕';
  // ajoute le bouton close comme enfant du modal (appendChild insère un nœud enfant).
  modal.appendChild(close);

  // création du titre H3.
  const h3 = document.createElement('h3');
  // textContent remplit le titre ; l'opérateur || fournit une valeur par défaut.
  h3.textContent = title || 'Détails';
  // on ajoute le titre dans la fenêtre modale.
  modal.appendChild(h3);

  // création du paragraphe contenant la description complète.
  const p = document.createElement('p');
  // textContent est utilisé pour éviter l'insertion de HTML non désiré.
  p.textContent = text || '';
  modal.appendChild(p);

  // on ajoute la fenêtre modale dans l'overlay, puis l'overlay dans le body.
  overlay.appendChild(modal);
  // appendChild sur document.body insère l'overlay à la fin du <body>.
  document.body.appendChild(overlay);

  // Empêche le scroll de la page en modifiant le style inline du body.
  // Modifier document.body.style.overflow sur 'hidden' bloque le défilement.
  document.body.style.overflow = 'hidden';

  // addEventListener attache un écouteur d'évènement 'click' au bouton close.
  // Quand on clique sur la croix, on exécute la fonction fléchée pour fermer le modal.
  close.addEventListener('click', () => {
    // remove() supprime directement l'élément overlay du DOM.
    overlay.remove();
    // on restaure le comportement de scroll du body en enlevant la valeur inline.
    document.body.style.overflow = '';
    // si trigger est défini et possède la méthode focus, on remet le focus dessus (accessibilité basique).
    if (trigger) trigger.focus();
  });

  // fermeture aussi si l'utilisateur clique sur le fond (overlay).
  // l'évènement click est attaché à l'overlay ; on vérifie que la cible du clic est bien l'overlay lui-même.
  overlay.addEventListener('click', (e) => {
    // e.target est l'élément exact cliqué ; si c'est l'overlay (et non le modal), on ferme.
    if (e.target === overlay) {
      overlay.remove();
      document.body.style.overflow = '';
      if (trigger) trigger.focus();
    }
  });
}


// Parcourt la NodeList 'buttons' et attache un gestionnaire 'click' pour chaque bouton.
buttons.forEach(btn => {
  // addEventListener attache l'écouteur 'click' au bouton courant.
  btn.addEventListener('click', (e) => {
    // e.currentTarget retourne l'élément sur lequel l'écouteur est enregistré (le bouton).
    const b = e.currentTarget;

    // closest recherche l'ancêtre le plus proche qui correspond au sélecteur '.card'.
    // Cette méthode remonte la hiérarchie DOM depuis le bouton jusqu'au document.
    const card = b.closest('.card');

    // querySelector sur l'élément card renvoie le premier descendant correspondant à '.card-title'.
    // Si card est null (sécurité), on laisse titleEl à null.
    const titleEl = card ? card.querySelector('.card-title') : null;

    // on cherche en priorité '.card-full' (la description complète cachée).
    // Si elle n'existe pas, on récupère '.card-text' (le résumé).
    const fullEl = card ? card.querySelector('.card-full') : null;
    const textEl = fullEl ? fullEl : (card ? card.querySelector('.card-text') : null);

    // textContent récupère le contenu texte d'un élément (sans balises HTML).
    // trim() enlève les espaces superflus au début et à la fin.
    const title = titleEl ? titleEl.textContent.trim() : 'Détails';
    const text = textEl ? textEl.textContent.trim() : '';

    // appelle showModal avec le titre, le texte et le bouton déclencheur (pour restore focus).
    showModal(title, text, b);
  });
});