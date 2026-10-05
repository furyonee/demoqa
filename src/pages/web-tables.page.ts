import { expect, Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { IWebTableRecord } from '../data/web-tables.data';

export class WebTablesPage extends BasePage {
  readonly pageHeading = this.page.getByRole('heading', { name: 'Web Tables' });
  readonly table = this.page.getByRole('table');
  readonly addButton = this.page.getByRole('button', { name: 'Add' });
  readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  readonly firstNameInput = this.page.locator('#firstName');
  readonly lastNameInput = this.page.locator('#lastName');
  readonly emailInput = this.page.locator('#userEmail');
  readonly ageInput = this.page.locator('#age');
  readonly salaryInput = this.page.locator('#salary');
  readonly departmentInput = this.page.locator('#department');
  readonly searchInput = this.page.locator('#searchBox');
  readonly webTableRows = this.page.locator('tbody tr');
  readonly actionCell = this.page.locator('.action-buttons');
  readonly actionButtons = this.page.locator('[id^="edit-record-"], [id^="delete-record-"]');

  async waitForLoaded(): Promise<void> {
    await expect(this.pageHeading, 'Web Tables page should be opened').toBeVisible();
    await expect(this.table, 'Web Tables table should be visible').toBeVisible();
  }

  async fillWebTableForm(record: IWebTableRecord): Promise<void> {
    const { firstName, lastName, email, age, salary, department } = record;

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(String(age));
    await this.salaryInput.fill(String(salary));
    await this.departmentInput.fill(department);
  }

  async createRecord(record: IWebTableRecord): Promise<void> {
    await this.addButton.click();
    await this.fillWebTableForm(record);
    await this.submitButton.click();
  }

  async search(searchValue: string): Promise<void> {
    await this.searchInput.fill(searchValue);
  }

  getRecordDataCells(email: string): Locator {
    return this.getRecordCells(email).filter({ hasNot: this.actionCell });
  }

  getRecordActionButtons(email: string): Locator {
    return this.getRecordCells(email).filter({ has: this.actionCell }).locator(this.actionButtons);
  }

  private getRecordCells(email: string): Locator {
    return this.webTableRows.filter({ hasText: email }).getByRole('cell');
  }
}
