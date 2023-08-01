describe('Testing To-Do Items', () => {
  beforeEach(() => {
    // here we will visit the to-do app's h test
    cy.visit('http://localhost:3000');
  });

  it('should render and validate to-do items', () => {
    // we need to define our todo items
    const TODO_ITEM_ONE = 'Make every moment count';
    const TODO_ITEM_TWO = 'Invest in yourself';
    const TODO_ITEM_THREE = 'Learn Cypress';

    // we need to add our todo items and press enter
    cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}');
    cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}');
    cy.get('.new-todo').type(TODO_ITEM_THREE).type('{enter}');
    cy.get('.todo-list li').should('have.length', 3);
    cy.get('.todo-list li').eq(0).should('contain.text', TODO_ITEM_ONE);
    cy.get('.todo-list li').eq(1).should('contain.text', TODO_ITEM_TWO);
    cy.get('.todo-list li').eq(2).should('contain.text', TODO_ITEM_THREE);
  });

  it("should mark 'Learn Cypress' as complete", () => {
    // defining our to do item
    const TODO_ITEM_THREE = 'Learn Cypress';

    // add it an press enter
    cy.get('.new-todo').type(TODO_ITEM_THREE).type('{enter}');
    cy.contains('.todo-list li', TODO_ITEM_THREE).find('.toggle').click();

    // make sure that our learn cypress
    cy.contains('.todo-list li', TODO_ITEM_THREE).should(
      'have.class',
      'completed'
    );
  });

  it("should mark 'Learn Cypress' as incomplete", () => {
    const TODO_ITEM_THREE = 'Learn Cypress';
    cy.get('.new-todo').type(TODO_ITEM_THREE).type('{enter}');
    cy.contains('.todo-list li', TODO_ITEM_THREE).find('.toggle').click();
    cy.contains('.todo-list li', TODO_ITEM_THREE).find('.toggle').click();
    cy.contains('.todo-list li', TODO_ITEM_THREE).should(
      'not.have.class',
      'completed'
    );
  });
});
