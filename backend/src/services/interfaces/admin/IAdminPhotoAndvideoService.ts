


export default interface IAdminPhotoAndvideoService {
    getPhotoAndVideoServices(page:number, limit:number): Promise<any>;
    createPhotoAndVideoServicesServc(serviceData:any) : Promise<any>
}