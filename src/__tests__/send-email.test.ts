describe("POST /api/send-email", () => {
  test("Should send email", async () => {
    const response = await fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.EMAIL_RECIPIENT ?? "pageasy.muriae@gmail.cm",
        emailType: "test",
      }),
    });

    expect(response.status).toBe(200);
  });
  test("Empty body should not send an email", async () => {
    const response = await fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    expect(response.status).toBe(400);
  });
});
