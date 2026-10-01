import { webTableRecord } from '../../src/data/web-table.data';
import { test } from '../../src/fixtures/app.fixtures';

test('Should create Web Table record', async ({ mainPage, elementsPage }) => {
  await mainPage.open();
  await mainPage.elementsCard.click();
  await elementsPage.webTablesItem.click();
  await elementsPage.addButton.click();
  await elementsPage.fillWebTableForm(webTableRecord);
  await elementsPage.submitButton.click();
  await elementsPage.search(webTableRecord.email);

  await elementsPage.verifyRecordIsDisplayed(webTableRecord);
});
