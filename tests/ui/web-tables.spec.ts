import { createWebTableRecord } from '../../src/data/web-tables.data';
import { expect, test } from '../../src/fixtures/app.fixtures';

test.beforeEach(async ({ mainPage, elementsPage, webTablesPage }) => {
  await mainPage.open();
  await mainPage.elementsCard.click();
  await elementsPage.webTablesItem.click();
  await webTablesPage.waitForLoaded();
});

test('Should add a new record to Web Table', async ({ webTablesPage }) => {
  const initialRowsCount = await webTablesPage.webTableRows.count();

  await webTablesPage.createRecord(createWebTableRecord());

  await expect(
    webTablesPage.webTableRows,
    'Number of rows should increase by one after adding a record'
  ).toHaveCount(initialRowsCount + 1);
});

test('Should display correct data in Web Table record', async ({ webTablesPage }) => {
  const webTableRecord = createWebTableRecord();
  const { firstName, lastName, age, email, salary, department } = webTableRecord;

  await webTablesPage.createRecord(webTableRecord);
  await webTablesPage.search(email);

  await expect(
    webTablesPage.getRecordDataCells(email),
    `Web table should contain a record for ${email}`
  ).toHaveText([firstName, lastName, String(age), email, String(salary), department]);
  await expect(
    webTablesPage.getRecordActionButtons(email),
    `Action buttons should be available for the record with email ${email}`
  ).toHaveCount(2);
});
