

export interface adminLoginRequestDto{
    email:string;
    password:string;
};

export interface IAdmin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile?: string;
};
