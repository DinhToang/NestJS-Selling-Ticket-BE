import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/browser';
import { UpdateResult } from 'typeorm/browser';
import { UpdateSongDTO } from './dto/update-song-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from '../artists/artist.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class SongsService {
  // local db
  // local array

  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    //save song to db
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    const artists = await this.artistsRepository.findByIds(songDTO.artists)

    song.artists = artists

    return this.songsRepository.save(song);
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

  remove(id: number): Promise<DeleteResult>{
    return this.songsRepository.delete(id)
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>>{
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options)
  }
}
