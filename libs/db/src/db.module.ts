import { Global, Module, Provider } from '@nestjs/common';
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { DbService } from './db.service';
import { User } from './schemas/user.schemas';

const providers: Provider[] = [
  {
    // 提供一个数据库连接服务
    provide: 'DB_CONNECTION',
    // 默认是全局单例注册，供全局使用，如果使用 scope: 'Request'，则每次请求都会创建一个新的实例
    useFactory: () => mongoose.connect('mongodb://localhost:27017/nest'),
  },
  {
    provide: User.name,
    useFactory: () => getModelForClass(User),
  },
];

// 标记为全局模块，可以被其他模块引用
@Global()
@Module({
  providers,
  exports: providers,
})
export class DbModule {}
