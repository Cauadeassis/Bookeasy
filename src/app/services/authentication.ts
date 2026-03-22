const errorMessages = {
  invalidPassword:
    "A senha deve ter pelo menos 8 dígitos, letra maiúscula e um símbolo",
  invalidEmail: "O email deve terminar com @gmail.com",
  emailAlreadyExists: "Email já cadastrado",
  internalError: "Erro interno",
} as const;

type ErrorMessage = (typeof errorMessages)[keyof typeof errorMessages];

interface CreateAccountProps {
  email: string;
  password: string;
}

export function passwordIsInvalid(password: string): boolean {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*]/.test(password);

  return !(hasMinLength && hasUpperCase && hasSymbol);
}

export function emailIsInvalid(email: string): boolean {
  return !email.endsWith("@gmail.com");
}

export async function createAccount({
  email,
  password,
}: CreateAccountProps): Promise<ErrorMessage | null> {
  if (passwordIsInvalid(password)) return errorMessages.invalidPassword;

  if (emailIsInvalid(email)) return errorMessages.invalidEmail;

  const response = await fetch("http://localhost:3000/api/create-account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return response.status === 409
      ? errorMessages.emailAlreadyExists
      : errorMessages.internalError;
  }

  return null;
}
