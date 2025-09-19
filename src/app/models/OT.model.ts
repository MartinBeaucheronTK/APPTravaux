import { IOT } from "../interfaces/OT.interface";

export class OT implements IOT{
  idOT:number = 0;
  nomOT:string="";
  idDO:number=0;


      copy(): OT{
          return Object.assign(new OT(), this);
      }
  
      fromJson(OTJson:IOT):OT{
          return Object.assign(new OT(), OTJson);
      }
  
      toJson(): IOT{
          const OTJson:IOT = Object.assign({}, this);
          delete OTJson.idOT;
          return OTJson;
      }
}