import { expect } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { IWebTableRecord } from '../data/web-table.data';

export class ElementsPage extends BasePage {
  readonly webTablesItem = this.page.getByRole('link', { name: 'Web Tables' });
  readonly addButton = this.page.getByRole('button', { name: 'Add' });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

  async fillWebTableForm(record: IWebTableRecord): Promise<void> {
    const { firstName, lastName, email, age, salary, department } = record;
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Age' }).fill(String(age));
    await this.page.getByRole('textbox', { name: 'Salary' }).fill(String(salary));
    await this.page.getByRole('textbox', { name: 'Department' }).fill(department);
  }

  async search(fullName: string) {
    await this.page.getByRole('textbox', { name: 'Type to search' }).fill(fullName);
  }

  async verifyRecordIsDisplayed(record: IWebTableRecord): Promise<void> {
    const { firstName, lastName, email, age, salary, department } = record;
    const row = this.page.locator('tbody tr').filter({ hasText: firstName });

    await expect(row).toContainText(
      [firstName, lastName, String(age), email, String(salary), department].join('')
    );
  }
}
