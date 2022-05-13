import { Prop } from '@typegoose/typegoose';

/**
 * Declare two database fields
 * @Prop() Modifiers
 */
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;
}
