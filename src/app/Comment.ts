import {ObjectId} from "mongoose";


export class Comment{

    createdBy	:string | undefined;
dateCreated	:string | undefined;
id	:string | undefined;
message:	string | undefined;
photoId	:string | undefined|null;
}