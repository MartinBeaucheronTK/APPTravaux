import { IPDP } from "../interfaces/pdp.interface";

export class PDP implements IPDP{
  idPDP:number = 0;
  titrePDP:string = "";
  descriptionPDP:string="";
  jour:string = "";
  mois:string = "";
  annee:string="";
  numOT:number = 0;
  secteur:number = 0;

    copy(): PDP{
        return Object.assign(new PDP(), this);
    }
  
    fromJson(PDPJson:IPDP):PDP{
        return Object.assign(new PDP(), PDPJson);
    }
  
    toJson(): IPDP{
        const PDPJson:IPDP = Object.assign({}, this);
        delete PDPJson.idPDP;
        return PDPJson;
    }
}