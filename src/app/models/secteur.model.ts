import { Isecteur } from "../interfaces/secteur.inteface";

export class secteur implements Isecteur{
    idSecteur:number = 0;
    nomSecteur:string ="";


    copy(): secteur{
        return Object.assign(new secteur(), this);
    }

    fromJson(secteurJson:Isecteur):secteur{
        return Object.assign(new secteur(), secteurJson);
    }

    toJson(): Isecteur{
        const secteurJson:Isecteur = Object.assign({}, this);
        delete secteurJson.idSecteur;
        return secteurJson;
    }
}