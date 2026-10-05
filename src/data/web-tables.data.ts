import { faker } from '@faker-js/faker';

export interface IWebTableRecord {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  salary: number;
  department: string;
}

export const createWebTableRecord = (): IWebTableRecord => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    age: faker.number.int({ min: 18, max: 65 }),
    email: faker.internet.email({ firstName, lastName }),
    salary: faker.number.int({ min: 30000, max: 150000 }),
    department: faker.commerce.department()
  };
};
