import { test } from '@playwright/test';
import UnimedCriciumaPage from '../support/pages/UnimedCriciumaPage';

/**
 * Testes E2E do site institucional da Unimed Criciúma (https://www.unimedcriciuma.com.br).
 * Todos os cenários seguem o padrão AAA (Arrange, Act, Assert) e utilizam o
 * Playwright com Page Object Model, conforme a documentação oficial.
 */
test.describe('Unimed Criciúma - Testes E2E', () => {
  let unimedPage: UnimedCriciumaPage;

  test.beforeEach(async ({ page }) => {
    unimedPage = new UnimedCriciumaPage(page);
  });

  /**
   * Teste 1 — Verifica se a home carrega com título e logo esperados.
   */
  test('Deve carregar a home da Unimed Criciúma com título e logo', async () => {
    // Arrange: Page Object instanciado no beforeEach.

    // Act: acessa a home da Unimed Criciúma.
    await unimedPage.acessarHome();

    // Assert: título contém "Unimed" e logo aparece na tela.
    await unimedPage.validarTituloHome();
    await unimedPage.validarLogoVisivel();
    await unimedPage.validarMenuAUnimedVisivel();
  });

  /**
   * Teste 2 — Navega pelo menu Plano de Saúde e valida a URL de destino.
   */
  test('Deve navegar para a página Plano de Saúde pelo menu', async () => {
    // Arrange: parte da home carregada.
    await unimedPage.acessarHome();

    // Act: clica no item de menu "Plano de Saúde".
    await unimedPage.acessarMenuPlanoSaude();

    // Assert: URL muda para rota que contém "plano".
    await unimedPage.validarUrlContem('plano');
  });

  /**
   * Teste 3 — Navega pelo menu Guia Médico e valida a URL de destino.
   */
  test('Deve navegar para a página Guia Médico pelo menu', async () => {
    // Arrange: parte da home carregada.
    await unimedPage.acessarHome();

    // Act: clica no item de menu "Guia Médico".
    await unimedPage.acessarMenuGuiaMedico();

    // Assert: URL muda para rota que contém "guia".
    await unimedPage.validarUrlContem('guia');
  });
});