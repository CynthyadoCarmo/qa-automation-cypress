Cypress.on('uncaught:exception', (err, runnable) => {

  return false

})

describe('Cadastro Automation Testing', () => {

  it('Deve realizar cadastro com sucesso', () => {

    cy.visit('https://demo.automationtesting.in/Register.html')

    cy.viewport(1280, 720)

    // Nome
    cy.get('input[placeholder="First Name"]', { timeout: 15000 })
      .should('be.visible')
      .type('Maria')

    // Sobrenome
    cy.get('input[placeholder="Last Name"]')
      .type('Oliveira')

    // Endereço
    cy.get('textarea')
      .type('Rua das Flores, São Paulo')

    // Email
    cy.get('input[type="email"]')
      .type('mariaoliveira@email.com')

    // Telefone
    cy.get('input[type="tel"]')
      .type('11988887777')

    // Gênero
    cy.get('input[value="FeMale"]')
      .check({ force: true })

    // Hobby
    cy.get('#checkbox2')
      .check({ force: true })

    // Skills
    cy.get('#Skills')
      .select('APIs')

    // Ano
    cy.get('#yearbox')
      .select('1995')

    // Mês
    cy.get('select[placeholder="Month"]')
      .select('May')

    // Dia
    cy.get('#daybox')
      .select('15')

    // Senha
    cy.get('#firstpassword')
      .type('Qa123456')

    // Confirmar senha
    cy.get('#secondpassword')
      .type('Qa123456')

    // Screenshot sucesso
    cy.screenshot('cadastro-sucesso')

  })


  it('Deve validar campos obrigatórios', () => {

    cy.visit('https://demo.automationtesting.in/Register.html')

    cy.viewport(1280, 720)

    // Tenta cadastrar vazio
    cy.get('#submitbtn')
      .click()

    // Valida campos vazios
    cy.get('input[placeholder="First Name"]')
      .should('be.visible')

    cy.get('input[placeholder="Last Name"]')
      .should('be.visible')

    // Screenshot erro
    cy.screenshot('cadastro-invalido')

  })

})