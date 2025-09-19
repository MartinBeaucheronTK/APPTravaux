import { IEE } from "../interfaces/EE.interface";

export class EE implements IEE{
  idEE:number = 0;
  nomEE: string = "";
  adresseEE:string="";  


      copy(): EE{
          return Object.assign(new EE(), this);
      }
  
      fromJson(EEJson:IEE):EE{
          return Object.assign(new EE(), EEJson);
      }
  
      toJson(): IEE{
          const EEJson:IEE = Object.assign({}, this);
          delete EEJson.idEE;
          return EEJson;
      }
}