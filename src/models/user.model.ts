import { BaseModel } from "./base-model.model";

export interface User extends BaseModel {
  email: string;
  name: string;
  password: string;
  birthAt: string;
  rule: string[];
}
