export interface IAddBookResponse {
  books: {
    isbn: string;
  }[];
}

export interface IBooksResponse {
  books: {
    isbn: string;
    title: string;
    subTitle: string;
    author: string;
    publish_date: string;
    publisher: string;
    pages: number;
    description: string;
    website: string;
  }[];
}

export const bookData = (userId: string, isbn: string) => {
  return {
    userId,
    collectionOfIsbns: [{ isbn }]
  };
};
