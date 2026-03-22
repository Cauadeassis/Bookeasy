"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import EmailField from "./components/emailField";
import PasswordField from "./components/passwordField";
import StepLink from "./components/stepLink";
import { createAccount } from "./services/authentication";
import { sendEmail } from "./services/email";

type Step =
  | "createAccount"
  | "login"
  | "forgotPassword"
  | "verifyingCode"
  | "newPassword"
  | "success";

export default function Login() {
  const [step, setStep] = useState<Step>("createAccount");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleCreateAccount() {
    const error = await createAccount({ email, password });
    if (error) setError(error);
  }
  async function handleSendCode() {
    sendEmail({
      email: "pageasy.muriae@gmail.com",
      emailType: "forgot-password",
    });
  }

  return (
    <div className={styles.body}>
      <div className={styles.siteContent}>
        <header></header>

        <main>
          <form>
            {step === "createAccount" && (
              <>
                <EmailField value={email} onChange={setEmail} />
                <PasswordField value={password} onChange={setPassword} />
                <StepLink onClick={() => setStep("login")}>
                  Já tenho uma conta
                </StepLink>

                <button
                  type="button"
                  className={styles.mainButton}
                  onClick={handleCreateAccount}
                >
                  Criar
                </button>
              </>
            )}
            {step === "login" && (
              <>
                <EmailField value={email} onChange={setEmail} />

                <PasswordField value={password} onChange={setPassword} />
                <div className={styles.buttonFlexContainer}>
                  <StepLink onClick={() => setStep("forgotPassword")}>
                    Esqueci a senha
                  </StepLink>
                  <StepLink onClick={() => setStep("createAccount")}>
                    Já tenho uma conta
                  </StepLink>
                </div>

                <button type="button" className={styles.mainButton}>
                  Entrar
                </button>
              </>
            )}

            {step === "forgotPassword" && (
              <>
                <EmailField value={email} onChange={setEmail} />

                <button
                  type="button"
                  onClick={handleSendCode}
                  className={styles.mainButton}
                >
                  Enviar código
                </button>
              </>
            )}

            {step === "verifyingCode" && (
              <>
                <label>
                  Código de verificação
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="12345"
                    required
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setStep("newPassword")}
                  className={styles.mainButton}
                >
                  Verificar código
                </button>
              </>
            )}

            {step === "newPassword" && (
              <>
                <PasswordField value={password} onChange={setPassword} />

                <button
                  type="button"
                  onClick={() => setStep("success")}
                  className={styles.mainButton}
                >
                  Criar nova senha
                </button>
              </>
            )}

            {step === "success" && (
              <>
                <p>Senha redefinida com sucesso 🎉</p>

                <button
                  type="button"
                  onClick={() => setStep("login")}
                  className={styles.mainButton}
                >
                  Voltar para login
                </button>
              </>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
