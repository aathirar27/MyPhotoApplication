
import {ObjectId} from "mongoose";

export class Photo {
    static photoUrl(photoUrl: any) {
        throw new Error('Method not implemented.');
    }

    albumId	:string | undefined|null;
createdBy	:string | undefined;
dateCreated :	string | undefined;
    id: string | undefined;
    photoUrl: string | undefined;


}