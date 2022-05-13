import { DbModule } from './../libs/db/src/db.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from '@app/db/schemas/user.schemas';

@Module({
  imports: [
    DbModule.forRoot('mongodb://localhost:27017/nest'),
    DbModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
