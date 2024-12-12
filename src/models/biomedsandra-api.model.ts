export interface Subject {
  id: number | null; // Permite null para novos subjects
  category: string;
  topics: string[];
  courseId: string;
}

export interface Work {
  id: number | null; // Permite null para novos works
  title: string;
  url: string;
  courseId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
  type: string;
  price: {
    original: string;
    discounted: string;
  };
  subjects: Subject[];
  works: Work[];
}
