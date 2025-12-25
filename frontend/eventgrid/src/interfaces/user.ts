

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  profile?: string;
};


export interface iSearchPrams {
    search?: string;
    category?: string;
    location?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }
