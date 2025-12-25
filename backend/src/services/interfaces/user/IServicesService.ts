


export default interface IServicesService {
    searchServices({
        filters,
        sort,
        page,
        limit
      }:{
        filters:string,
        sort:object,
        page:number,
        limit:number
      }): Promise<any>;
       getById(id:string): Promise<any>;
 
}