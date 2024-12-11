import { BaseModel } from "./base-model.model";

export interface Controller {
  name: string;
}

export interface Application extends BaseModel {
  name: string;
  description: string;
  controllers: string[];
  allowedRoles: string[];
}
