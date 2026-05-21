describe('Login OrangeHRM', () => {

  it('Deve realizar login com sucesso', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include', '/dashboard')

    cy.contains('Dashboard')
      .should('be.visible')

    // 📸 Print do dashboard
    cy.screenshot('login-sucesso')

  })


  it('Deve exibir erro ao informar senha inválida', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('senhaErrada')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    // 📸 Print do erro
    cy.screenshot('login-invalido')

  })

})