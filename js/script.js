function opendetails(){
    document.querrySelector('.details').style.display='block';
    document.getElementById('inscriptionForm').style.display='none';
}

function closedetails(){
    
}



document.getElementById('inscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    var nom = document.getElementById('nom').value.trim();
    var prenom = document.getElementById('prenom').value;
    var date_naissance = document.getElementById('date_naissance').value;
    var telephone = document.getElementById('telephone').value;
    var email = document.getElementById('email').value;
    var adresse = document.getElementById('adresse').value;
    var nom_responsable = document.getElementById('nom_responsable').value;
    var numero_responsable = document.getElementById('numero_responsable').value;
    var level = document.getElementById('level').value;
    var formation = document.getElementById('CourFormation').value;

    // Valider les données si nécessaire
    if (!nom) {
        alert('Veuillez saisir un nom.');
        return;
    }
    // Vous pouvez ajouter d'autres validations pour les autres champs ici

    // Envoyer les données à Firebase Realtime Database
    database.ref('utilisateurs/' + nom).set({
        Nom: nom,
        Prenom: prenom,
        Email: email,
        Phone: telephone,
        Adresse: adresse,
        Niveau: level,
        TypeFormation: formation,
        P_responsable: nom_responsable,
        N_responsable: numero_responsable
        // Ajoutez ici d'autres champs du formulaire avec leurs valeurs correspondantes
    })
    .then(function() {
        alert('Données envoyées avec succès à Firebase!');
        var message = `
            ${nom}  ${prenom}  "Vient d'inscrire pour" ${formation};
        `;

        var url = `https://wa.me/18098409048?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank').focus();
    })
    .catch(function(error) {
        console.error('Erreur lors de l\'envoi des données à Firebase :', error);
        // Gérer les erreurs d'envoi ici
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    });

    // Effacer le formulaire ou faire d'autres actions après soumission réussie
    this.reset(); // Efface le formulaire après soumission
});
