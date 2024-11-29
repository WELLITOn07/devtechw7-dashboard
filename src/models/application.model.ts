export interface Controller {
  name: string;
  data: Record<string, any>;
}

export interface Application {
  id: number;
  name: string;
  description: string;
  urlOrigin: string;
  allowedRoles: string[];
  controllers: Controller[];
}
