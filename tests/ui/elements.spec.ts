import { IWebTableRecord } from '../../src/data/web-table.data';
import { test } from '../../src/fixtures/app.fixtures';

test('Should create Element', async ({ mainPage, elementsPage }) => {
  await mainPage.open();
  await mainPage.elementsCard.click();
  await elementsPage.webTablesItem.click();
  await elementsPage.addButton.click();
  await elementsPage.fillWebTableForm(IWebTableRecord);
  await elementsPage.submitButton.click();
  await elementsPage.search(IWebTableRecord.email);

  await elementsPage.verifyRecordIsDisplayed(IWebTableRecord);
});
