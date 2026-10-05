import { BasePage } from '../core/base.page';

export class ElementsPage extends BasePage {
  readonly webTablesItem = this.page.getByRole('link', { name: 'Web Tables' });
}
