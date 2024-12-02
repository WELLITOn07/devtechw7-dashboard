export interface Controller {
  name: string;
}

export interface Application {
  id: number;
  name: string;
  description: string;
  urlOrigin: string;
  allowedRoles: string[];
  controllers: Controller[];
}
