import { Comment } from "./Comment";

export class User {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    status: string;
    profileImg: string;
    type: string;
    agencyName: string;
    state: string;
    city: string;
    street: string;
    streetNum: string;
    mb:string;
    description:string;
    comments:Array<Comment>;
    user_photo:any;
    
}