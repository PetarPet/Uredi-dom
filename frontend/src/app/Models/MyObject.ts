import { Job } from "./Job";
import { Sketch } from "./Sketch";
import { User } from "./User";

export class MyObject {
    idO:number;
    owner: string;
    type:string;
    area: string;
    rooms: string;
    state: string;
    city: string;
    street: string;
    streetNum: string;
    sketch: Array<Sketch>;
    jobs:Array<Job>;
    user:User;
}