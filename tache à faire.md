BACKEND:
    -Plat:
        -api qui fait un crud DishType
        -api qui fait un crud sur dish
        -api qui fait un crud sur dishPhoto
        -api qui fait un crud sur dishPrice
        -api qui modifie le state d'un plat (dispo/non dispo) 0-> dispo, 1-> non dispo


    -Commande:
        -api qui fait un crud dishOrder:
            .pour la liste -> recuperer juste les parents
            .pour la création, le front va envoyer dishOrder et dishOrderDetails en une fois.
                pour enregistrer, utiliser le concept de HELPER (parent/enfant)
            .il faut verifier que le state du plat est = 0 (disponible) avant d'enregistrer si 1 -> raise exception

        -api qui fait un getById
            .il faut retourner le parent et la liste des enfants
            .mettre aussi dans le type de retour le prix total
            
        -api qui fait un crud sur dishOrderDetails
            .on a besoin de l'api create|delete|update dans le cas où le client veut modifier sa commande
            .si le client ajoute une commande et que le state du parent est à 1, modifier ce dernier à 0

        -api qui modifie le state d'une commande enfant
            (on verifie si le state de tout les enfant sont terminer =1, si oui, modifier le state du parent à 1)

    -Plan de table(en temps reel):
        -api qui récupère la liste des tables avec leurs statut en temps réel.



-FRONTEND:
    -Plat: 
        -affichage comme d'habitude pour les 4 tables.
        -dans la liste de plat et detail de plat, permetre la modification du state entre dispo et non dispo
        -Dans le catalogue de plat(affichage avec photo):
            .créé un systeme de panier pour pouvoir commander
            .sous chaque photo, on pourra augmenter ou diminuer la quantité de plat
            .apres validation du panier:
                *recuperer la liste de table avec statut occuper/libre puis en choisir une 
                *si libre est choisi, la table sera occuper et il faudra choisir l'heure de la reservation (mbola ampiana am backend)
    
    -Commande:
        -Afficher la liste des commandes.
            -lorsque on clique sur une commande -> detail commande
        -Détails commande:
            .affichage de la liste des enfants commande
            .affichage du prix total de la commande

        -Création de commande :
            -choisir la table qui est dans table occupation pour la commande
            -choix de plat avec quantité (on peut choisir plusieurs plat)

    -Dans plan de table:
        -créé un affichage qui vous sera communiquer
        -lorsqu'on clique sur une table qui a pour statut occuper, on pourra:
            -voir si il a déjà commander et si:
                .oui -> voir le statut de ses commandes
                .non -> creer une commande

        -lorsqu'on clique sur une table qui a pour statut libre, on pourra reprendre le principe sur
        le catalogue de plat