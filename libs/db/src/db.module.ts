import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { DbService } from './db.service';

type ClassType = { new (...args: any[]): any };

@Module({})
export class DbModule {
  static forRoot(uri: string, options = {}): DynamicModule {
    const providers: Provider[] = [
      {
        // 提供一个数据库连接服务
        provide: 'DB_CONNECTION',
        // 默认是全局单例注册，供全局使用，如果使用 scope: 'Request'，则每次请求都会创建一个新的实例
        useFactory: () => mongoose.connect(uri, options),
      },
    ];
    return {
      module: DbModule,
      providers,
      exports: providers,
      // 标记为全局模块，可以被其他模块引用
      global: true,
    };
  }
  static forFeature(modules: ClassType[]): DynamicModule {
    const providers = modules.map((model) => {
      return {
        provide: model.name,
        useFactory: () => getModelForClass(model),
      } as Provider;
    });
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
