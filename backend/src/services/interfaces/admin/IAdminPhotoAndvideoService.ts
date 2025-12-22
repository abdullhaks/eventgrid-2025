


export default interface IAdminPhotoAndvideoService {
    getPhotoAndVideoServices(page:number, limit:number): Promise<any>;
    createPhotoAndVideoServicesServc(serviceData:any) : Promise<any>;
    getById(id:string): Promise<any>;
    updatePhotoAndVideoService(id:string, serviceData:any): Promise<any>;
}