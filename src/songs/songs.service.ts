import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/browser';
import { UpdateResult } from 'typeorm/browser';
import { UpdateSongDTO } from './dto/update-song-dto';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  // local db
  // local array

  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    //save song to db
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return await this.songsRepository.save(song);
  }

  findAll() : Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song | null>{
    return this.songsRepository.findOneBy({id});
  }

  update(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult>{
    return this.songsRepository.update(id, recordToUpdate);
  }

  async remove(id: number): Promise<DeleteResult>{
    return this.songsRepository.delete(id)
  }
}
