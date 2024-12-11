import { BaseModel } from "./base-model.model";

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

export interface Controller {
  name: string;
  data: Record<string, any>[];
}
