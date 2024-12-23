export class BookResponseDto {
    id: number;
    title: string;
    description: string;
    coverUrl?: string;
    year: number;
    averageRating: number;
    genres: string[]; // Names of genres
    authors: string[]; // Names of authors
    addedByUserId: number;
    addedAt: Date;
  }