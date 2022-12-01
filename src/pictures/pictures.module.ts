import { Module } from '@nestjs/common';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService]
})
export class PicturesModule {}
