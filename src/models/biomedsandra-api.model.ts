export interface Subject {
  category: string;
  topics: string[];
  topicsString?: string;
}

export interface Work {
  title: string;
  url: string;
}

export interface Price {
  original: string;
  discounted: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
  type: string;
  price: Price;
  subjects: Subject[];
  works: Work[];
}
