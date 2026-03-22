import database from "../infra/database";

describe("POST /api/create-account", () => {
  beforeAll(async () => {
    await database.query({
      text: "DELETE FROM users WHERE email = 'test@gmail.com'",
    });
  });
  test("Should create an account with valid email and password", async () => {
    const response = await fetch("http://localhost:3000/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@gmail.com",
        password: "Test123@",
      }),
    });

    expect(response.status).toBe(201);
  });

  test("Should return 409 when email already exists", async () => {
    const response = await fetch("http://localhost:3000/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@gmail.com",
        password: "Test123@",
      }),
    });

    expect(response.status).toBe(409);
  });

  test("Should return 400 when email or password is missing", async () => {
    const response = await fetch("http://localhost:3000/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@gmail.com" }),
    });

    expect(response.status).toBe(400);
  });
  afterAll(async () => {
    await database.query({
      text: "DELETE FROM users WHERE email = 'test@gmail.com'",
    });
  });
});
