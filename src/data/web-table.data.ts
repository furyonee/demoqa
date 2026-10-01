export interface IWebTableRecord {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  salary: number;
  department: string;
}

export const webTableRecord: IWebTableRecord = {
  firstName: 'Alden',
  lastName: 'Cantrell',
  age: 30,
  email: 'test@test.com',
  salary: 12345,
  department: 'QA'
};
