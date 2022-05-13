import { User } from '@app/db/schemas/user.schemas';
import { Controller, Get, Inject } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // 全局挂载 userModel
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
    return await this.userModel.findOne();
  }
}
