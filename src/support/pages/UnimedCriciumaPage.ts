import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model (POM) para o site institucional da Unimed Criciúma.
 * Centraliza seletores e ações de navegação, seguindo as boas práticas
 * recomendadas pela documentação do Playwright (locators + user-facing attributes).
 */
export default class UnimedCriciumaPage {
  private readonly page: Page;
  private readonly logo: Locator;
  private readonly menuPlanoSaude: Locator;
  private readonly menuGuiaMedico: Locator;
  private readonly menuAUnimed: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('img', { name: /unimed/i }).first();
    this.menuAUnimed = page.getByRole('link', { name: 'A Unimed', exact: true });
    this.menuPlanoSaude = page.getByRole('link', { name: 'Plano de Saúde', exact: true });
    this.menuGuiaMedico = page.getByRole('link', { name: 'Guia Médico', exact: true });
  }

  async acessarHome(): Promise<void> {
    await this.page.goto('https://www.unimedcriciuma.com.br/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async validarTituloHome(): Promise<void> {
    await expect(this.page).toHaveTitle(/Unimed/i);
  }

  async validarLogoVisivel(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async acessarMenuPlanoSaude(): Promise<void> {
    await this.menuPlanoSaude.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async acessarMenuGuiaMedico(): Promise<void> {
    await this.menuGuiaMedico.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async validarUrlContem(trecho: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(trecho, 'i'));
  }

  async validarMenuAUnimedVisivel(): Promise<void> {
    await expect(this.menuAUnimed.first()).toBeVisible();
  }
}