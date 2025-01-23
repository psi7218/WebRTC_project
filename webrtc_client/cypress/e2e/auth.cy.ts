describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("회원가입 테스트", () => {
    // 회원가입 버튼 클릭
    cy.contains("button", "SignUp").click();

    // 정보 입력
    cy.get('input[placeholder="이메일"]').type("test@example.com");
    cy.get('input[placeholder="비밀번호"]').type("test1234");
    cy.get('input[placeholder="닉네임"]').type("TestUser");

    // 프로필 색상 선택 (두 번째 색상)
    cy.get(".rounded-full").eq(1).click({ force: true });

    // 가입하기 버튼 클릭
    cy.contains("button", "가입하기").click();
  });

  it("로그인 테스트", () => {
    // 로그인 버튼 클릭
    cy.contains("button", "LOGIN").click();

    // 이메일 입력
    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Password"]').type("test1234");

    // 로그인 버튼 클릭
    cy.get('[data-testid="modal-login-btn"]').click();

    cy.contains("button", "logout", { timeout: 10000 }).should("exist");
  });
});
