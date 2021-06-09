//BASIC TESTS

describe('Try out', function(){
  it('app is running', function () {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy=tableIsVisible]')
        .should('be.visible');
  });
});

describe('Chapter got 6 columns', function () {
  it('returning 6 columns', function () {
    cy.get('[data-cy=tableIsVisible]').find('th').should('have.length', 6);
  })
})

describe('Dialog add chapter opens en input works', function () {
  it('Hoofdstuk toevoegen knop opens dialog en types input', function () {
    cy.get('[data-cy="openChapterEditDialog"]').click();
    cy.get('[data-cy="inputWorks"]').type("Input works");
    cy.get('[data-cy="cancelInputChapter"]').click();
  })
})

describe('Dialog add theme opens en input works', function () {
  it('Theme toevoegen knop opens dialog en types input', function () {
    cy.get('[data-cy="openThemeDialog"]').click();
    cy.get('[data-cy="inputWorksTheme"]').type("Input works");
    cy.get('[data-cy="cancelInputTheme"]').click();
  })
})

describe('Initial responce', function () {
  it('Returns more then 0 chapters', function () {
    cy.get('[data-cy=tableIsVisible]').find('tr').should('have.length.gte', 0);
  })
})

describe('Mock chapter get', function () {
  it('Get request chapters returns all chapters', function () {
    cy.server( {delay: 1000});
    cy.route({ method: 'GET', url: 'http://localhost:4200/api/chapters',
      status: 200,
      response: 'fixture:example.json'
    })
    cy.request('http://localhost:4200')
    cy.get('[data-cy=tableIsVisible]').find('tr').should('have.length', 14);
  })
})

