export enum ApplicationNames {
  BiomedSandra = 1,
  DevTechW7 = 2,
}

export interface Subscription {
  id?: number;
  email: string;
  applicationIds: number[];
  createdAt?: string;
}
