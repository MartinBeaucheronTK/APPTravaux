import { secteur } from './secteur.model';
import { IDO } from "../interfaces/DO.interface";

export class DO implements IDO{
    idDO:number= 0;
    nomDO:string ="";
    telDO:string="";


        copy(): DO{
            return Object.assign(new DO(), this);
        }
    
        fromJson(DOJson:IDO):DO{
            return Object.assign(new DO(), DOJson);
        }
    
        toJson(): IDO{
            const DOJson:IDO = Object.assign({}, this);
            delete DOJson.idDO;
            return DOJson;
        }
}