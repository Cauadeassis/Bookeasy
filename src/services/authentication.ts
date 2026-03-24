const errorMessages = {
  missingFields: "Preencha todos os campos",
  wrongFields: "Credenciais inválidas",
  invalidPassword:
    "A senha deve ter pelo menos 8 dígitos, letra maiúscula e um símbolo",
  invalidEmail: "O email deve terminar com @gmail.com",
  emailAlreadyExists: "Email já cadastrado",
  internalError: "Erro interno",
} as const;

type ErrorMessage = (typeof errorMessages)[keyof typeof errorMessages];

interface AccountProps {
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
}: AccountProps): Promise<ErrorMessage | null> {
  if (!email || !password) return errorMessages.missingFields;

  if (emailIsInvalid(email)) return errorMessages.invalidEmail;

  if (passwordIsInvalid(password)) return errorMessages.invalidPassword;

  const response = await fetch("/api/create-account", {
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

export async function loginAccount({
  email,
  password,
}: AccountProps): Promise<ErrorMessage | null> {
  if (!email || !password) return errorMessages.missingFields;

  if (emailIsInvalid(email)) return errorMessages.invalidEmail;

  if (passwordIsInvalid(password)) return errorMessages.invalidPassword;

  const response = await fetch("/api/login-account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return response.status === 401
      ? errorMessages.wrongFields
      : errorMessages.internalError;
  }

  return null;
}
