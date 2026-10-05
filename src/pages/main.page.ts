import { BasePage } from '../core/base.page';

export class MainPage extends BasePage {
  readonly elementsCard = this.page.getByRole('link', { name: 'Elements' });

  async open(): Promise<void> {
    await this.page.goto('/');
  }
}
