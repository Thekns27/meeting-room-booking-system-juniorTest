import { Email } from './value-objects/user-email.vo';

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

  static create(props: UserProps): User {
    return new User({
      ...props,
      role: props.role ?? UserRole.EMPLOYEE, // default က employee
      createdAt: props.createdAt ?? new Date(),
    });
  }

  get role(): UserRole {
    return this.props.role;
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      email: this.props.email.getValue(),
      password: this.props.password,
      role: this.props.role,
      createdAt: this.props.createdAt,
    };
  }
}
