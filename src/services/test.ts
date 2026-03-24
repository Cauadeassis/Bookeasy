export async function testGET() {
  const response = await fetch("/api/testing-api", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  console.log(data);
}
export async function testPOST(email: string) {
  const response = await fetch("/api/testing-api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  console.log(data);
}
