import { Reservation } from "./Reservation";

export class Worker {
    workerID:number;
    firstname:string;
    lastname:string;
    email:string;
    phone:string;
    speciality:string;
    agency:string
    reserved:Array<Reservation>
}