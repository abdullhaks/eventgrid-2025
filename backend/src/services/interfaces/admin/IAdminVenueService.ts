


export default interface IAdminVenueService {
    getVenueServices(page:number, limit:number): Promise<any>;
    createVenueServicesServc(serviceData:any) : Promise<any>;
    getById(id:string): Promise<any>;
    updateVenueService(id:string, serviceData:any): Promise<any>;
}