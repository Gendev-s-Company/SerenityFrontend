Structure du projet qu'on va utiliser:
/app
    /page.tsx on appelera les composants qu'on voudra afficher dans des page.tsx
         (la route web pour y accéder est leur route dossier)
    /layout. tsx contient on appel ici le layout qu'on veut appliquer dans nos pages

/components
    -On pourra créé ici les components qu'on veut.
    -voici les dossiers important:
    /form-component
        -Composant de création de form générique
    /ui
        -Ici sera présent les composant qu'on aura installer depuis shadcn/ui
        -Leur code est modifiable
    /update et /create 
        -Des composant pour le modal de création et d'update d'un entity
    /layout
        -Contient le layout utilisé par le projet (header, sidebar...)
    
/hooks
    -On met ici les hook personnalisé
/infrastructure
    -Ici on met les fonctions pour l'appel des api
    -On va créé des fonctions spécifiques pour chaque appel d'api afin d'éviter que les
endpoints ne soient exposer dans les navigateurs.
    -Ou bien mettre les endpoints dans des variables d'environnement
/types
    /component-type
        -Ici on met les interfaces qui seront réutilisable aux composant
    /entity-type
        -Ici on met les interfaces pour les objets qu'on va récupérer depuis l'api backend
/utils:
    Ici on mets les menu, fonctions divers comme les formattage...