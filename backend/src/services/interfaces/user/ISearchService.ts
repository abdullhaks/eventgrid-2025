


export default interface ISearchService {
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
 
}