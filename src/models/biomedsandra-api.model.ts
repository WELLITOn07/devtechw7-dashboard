export interface Subject {
  id: string | null; // Matches backend structure allowing null during creation
  category: string; // Category of the subject
  topics: string[]; // Array of topics (backend format)
  topicsString?: string; // Optional string representation for frontend input
  courseId: string | null; // Course ID associated with the subject
}

export interface Work {
  id: string | null; // Matches backend structure allowing null during creation
  title: string; // Title of the work
  url: string; // URL for the work resource
  courseId: string | null; // Course ID associated with the work
}

export interface Price {
  original: string; // Original price (formatted as string)
  discounted: string; // Discounted price (formatted as string)
}

export interface Course {
  id: string | null; // Matches backend structure allowing null during creation
  title: string; // Title of the course
  description: string; // Course description
  cover: string; // Cover image or identifier
  link: string; // Course link (URL)
  type: string; // Type of the course (e.g., "video", "ebook")
  price: Price; // Price details, as per backend format
  subjects: Subject[]; // Array of subjects associated with the course
  works: Work[]; // Array of works associated with the course
}
