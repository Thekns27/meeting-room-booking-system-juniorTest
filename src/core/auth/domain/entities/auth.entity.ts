import { Email } from "src/core/user/domain/value-objects/user-email.vo";



export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface UserProps {
  id?: string;
  name: string;
  email: Email;
  password: string;
  role: UserRole;
  createdAt?: Date;
}

export class User {
  private constructor(private props: UserProps) {}

   static create(props: UserProps) {
    return new User({
      ...props,
    email: typeof props.email === 'string' ? Email.create(props.email) : props.email,
      password: props.password,
    });
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      email: this.props.email.getValue(),
      role: this.props.role,
       password: typeof this.props.password === 'string'
        ? this.props.password
        : (this.props.password as any).getValue(),
    };
  }
}
