import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope:Scope.TRANSIENT,
})
export class SongsService {

    // local db
    // local array

    private readonly songs : any[] = [];

    create(song){
        //save song to db
        this.songs.push(song);
        return this.songs
    }

    findAll() {
        //fetch song from db
        // Errors comes while fetching data from db
        // throw new Error("Error in DB while fetching record")
        return this.songs
    }
}
