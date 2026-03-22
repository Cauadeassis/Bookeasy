"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [aberto, setAberto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.book}>
        <header
          className={`${styles.bookCover} ${aberto ? styles.openedCover : ""}`}
          onClick={() => setAberto(!aberto)}
        >
          <div className={styles.coverFront}>
            {/* conteúdo que aparece quando fechado*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#463131"
              viewBox="0 0 24 24"
            >
              {/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}
              <path d="M21 3h-7c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H3c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1h5.76c.53 0 1.04.21 1.41.59l1.12 1.12s.02.01.03.02c.09.08.18.15.29.2.12.05.25.08.38.08s.26-.03.38-.08c.11-.05.21-.12.29-.2 0 0 .02-.01.03-.02l1.12-1.12c.37-.37.89-.59 1.41-.59h5.76c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1ZM8.76 18H4V5h6c.55 0 1 .45 1 1v12.69c-.66-.44-1.44-.69-2.24-.69M20 18h-4.76c-.8 0-1.58.25-2.24.69V6c0-.55.45-1 1-1h6z"></path>
            </svg>
            <h1>Bookeasy</h1>
          </div>
          <div className={styles.coverBack}>
            {/* conteúdo que aparece quando aberto*/}
          </div>
        </header>
        <main
          className={`${styles.bookContent} ${aberto ? styles.openedContent : ""}`}
        >
          <div className={styles.fieldsContainer}>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Digite o email"
                required
              />
            </div>
            <div className={styles.field}>
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Digite a senha"
                required
              />
            </div>
          </div>
          <button>Cadastrar</button>
        </main>
      </div>
    </div>
  );
}
