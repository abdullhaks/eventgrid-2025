


export default interface IAdminCateringService {
    getCateringServices(page:number, limit:number): Promise<any>;
    createCateringServicesServc(serviceData:any) : Promise<any>;
    getById(id:string): Promise<any>;
    updateCateringService(id:string, serviceData:any): Promise<any>;
}