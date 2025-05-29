describe('Бургер Конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  function openModal() {
    cy.get("[data-cy='ingredients-items']").first()
    .find("[data-cy='ingredient-container']").first()
    .click();
  }
  
  it('Добавление ингредиентов', () => {
    cy.get("[data-cy='noBuns']").should("have.length", 3);
    
    cy.clickIngredientInIndexedContainer(0);

    cy.clickIngredientInIndexedContainer(1);

    cy.get("[data-cy='burger-constructor-element']").should("be.visible");
    cy.get("[data-cy='burger-constructor-element-fullwidth']").should("be.visible");
  });
  describe('Открытие модалок и закрытие', () => {
    beforeEach(() => {
      openModal();
      cy.checkModalViibility(true);
    });

    it('Закрытие на кнопку', () => {
      cy.get("[data-cy='modal']")
        .find("button")
        .click();
        
      cy.checkModalViibility(false);
    });

    it('Закрытие на оверлэй', () => {
      cy.get("[data-cy='modal-overlay']")
        .click({force: true})
        
      cy.checkModalViibility(false);
    });
  });
});