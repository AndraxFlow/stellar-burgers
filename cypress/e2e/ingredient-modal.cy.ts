describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' })
      .as('loadIngredients');
    
    cy.visit('/');
    
    cy.wait('@loadIngredients');
  });

  it('должен открывать модальное окно при клике на ингредиент', () => {
    cy.checkModalViibility(false);

    cy.get("[data-cy='ingredients-items']")
      .first()
      .find("[data-cy='ingredient-container']")
      .first()
      .click();

    cy.checkModalViibility(true);
  });

  it('должен отображать информацию о выбранном ингредиенте', () => {
    cy.get("[data-cy='ingredients-items']")
      .first()
      .find("[data-cy='ingredient-container']")
      .first()
      .then(($ingredient) => {
        const ingredientName = $ingredient.find('.text_type_main-default').text().trim();
        //const ingredientPrice = $ingredient.find('.text_type_digits-default').text(); // Достаточно и названия

        cy.wrap($ingredient).click();

        cy.get("[data-cy='modal']")
          .find('.text_type_main-large')
          .should('have.text', 'Детали ингредиента');

        cy.get("[data-cy='modal']")
          .find('.text_type_main-medium')
          .should('have.text', ingredientName);

        cy.get("[data-cy='modal']")
          .find('img')
          .should('be.visible');

        cy.get("[data-cy='modal']")
          .find('ul')
          .should('be.visible')
          .and('contain', 'Калории, ккал');
      });
  });

  it('должен закрывать модальное окно при клике на кнопку закрытия', () => {
    cy.get("[data-cy='ingredients-items']")
      .first()
      .find("[data-cy='ingredient-container']")
      .first()
      .click();

    cy.checkModalViibility(true);

    cy.get("[data-cy='modal']")
      .find("button")
      .click();

    cy.checkModalViibility(false);
  });

  it('должен закрывать модальное окно при клике на оверлей', () => {
    cy.get("[data-cy='ingredients-items']")
      .first()
      .find("[data-cy='ingredient-container']")
      .first()
      .click();

    cy.checkModalViibility(true);

    cy.get("[data-cy='modal-overlay']")
      .click({ force: true });

    cy.checkModalViibility(false);
  });
}); 