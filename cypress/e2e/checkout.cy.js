describe('Automation Exercise - Fluxo completo E2E', () => {

  const email = `teste_${Date.now()}@qa.com`;

  it('Cadastro, login, adicionar produtos e finalizar compra', () => {

    // 1. Acessar site
    cy.visit('https://automationexercise.com');

    // 2. Ir para Signup/Login
    cy.contains('Signup / Login').click();

    // 3. Cadastro de usuário
    cy.get('[data-qa="signup-name"]').type('Teste QA');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // 4. Preencher formulário de criação de conta
    cy.get('#id_gender1').click();
    cy.get('[data-qa="password"]').type('Test@123');
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('May');
    cy.get('[data-qa="years"]').select('1995');

    cy.get('[data-qa="first_name"]').type('Teste');
    cy.get('[data-qa="last_name"]').type('QA');
    cy.get('[data-qa="address"]').type('Rua Teste 123');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('SP');
    cy.get('[data-qa="city"]').type('Barueri');
    cy.get('[data-qa="zipcode"]').type('06400-000');
    cy.get('[data-qa="mobile_number"]').type('11999999999');

    cy.get('[data-qa="create-account"]').click();

    // 5. Validar conta criada
    cy.contains('Account Created!').should('be.visible');
    cy.contains('Continue').click();

    // 6. Login validado automaticamente
    cy.contains('Logged in as').should('be.visible');

    // 7. Ir para produtos
    cy.contains('Products').click();

    // 8. Adicionar primeiro produto
    cy.get('.productinfo').first().contains('Add to cart').click();
    cy.contains('Continue Shopping').click();

    // 9. Adicionar segundo produto
    cy.get('.productinfo').eq(1).contains('Add to cart').click();
    cy.contains('View Cart').click();

    // 10. Validar carrinho
    cy.url().should('include', '/view_cart');
    cy.get('.cart_description').should('have.length.at.least', 2);

    // 11. Proceed to checkout
    cy.contains('Proceed To Checkout').click();

    // 12. Validar checkout
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // 13. Comentário e finalização
    cy.get('textarea[name="message"]').type('Pedido de teste automatizado Cypress');
    cy.contains('Place Order').click();

    // 14. Simular pagamento
    cy.get('[name="name_on_card"]').type('Teste QA');
    cy.get('[name="card_number"]').type('4111111111111111');
    cy.get('[name="cvc"]').type('123');
    cy.get('[name="expiry_month"]').type('12');
    cy.get('[name="expiry_year"]').type('2030');

    cy.get('[data-qa="pay-button"]').click();

    // 15. Validação final
   cy.contains(/order placed|confirmed/i).should('be.visible');

  });

});