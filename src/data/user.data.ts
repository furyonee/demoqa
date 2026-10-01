export interface IUserResponseData {
  userID: string;
  username: string;
}

export interface IUserData {
  userId: string;
  username: string;
  books: {
    isbn: string;
    title: string;
  }[];
}
