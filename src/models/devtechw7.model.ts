// Base model for common properties
export interface BaseModel {
  id: number;
  createdAt: string;
}

export interface Application extends BaseModel {
  name: string;
  description: string;
  controllers: string[];
  allowedRoles: string[];
}

export interface AccessRule extends BaseModel {
  urlOrigin: string;
  allowedRoles: string[];
}

export interface User extends BaseModel {
  email: string;
  name: string;
  password: string;
  birthAt: string;
  rule: string[];
}

export interface Controller {
  name: string;
  data: Record<string, any>[];
}
