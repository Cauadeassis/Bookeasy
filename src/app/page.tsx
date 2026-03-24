"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./styles.module.scss";

export default function SitePage() {
  const [formOpen, setFormOpen] = useState(false);
  const [bookCount, setBookCount] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const cleanForm = useCallback(() => {
    setTitle("");
    setAuthor("");
    setGender("");
    setDescription("");
  }, []);

  const toggleForm = useCallback(() => {
    setFormOpen((prev) => {
      if (!prev) setTimeout(() => titleRef.current?.focus(), 300);
      return !prev;
    });
  }, []);

  const handleCleanForm = useCallback(() => {
    cleanForm();
    if (formOpen) toggleForm();
  }, [formOpen, cleanForm, toggleForm]);

  const handleSaveBook = useCallback(() => {
    if (!title || !author || !gender) return;
    setBookCount((bookCount) => bookCount + 1);
    cleanForm();
    toggleForm();
  }, [title, author, gender, cleanForm, toggleForm]);

  return (
    <div className={styles.body}>
      <header>
        <span>📚</span>
        <hgroup>
          <h1>Bookeasy</h1>
          <p>Painel do Usuário</p>
        </hgroup>
        <aside>
          <span>M</span>
        </aside>
      </header>

      <main>
        <section>
          <h2>Gerenciar Conta</h2>
          <dl>
            <div className={styles.accountRow}>
              <div>
                <dt>
                  <i className="fa-solid fa-user"></i> Nome de usuário
                </dt>
                <dd>Maria Leitora</dd>
              </div>
              <button title="Editar nome">✏️</button>
            </div>

            <div className={styles.accountRow}>
              <div>
                <dt>E-mail</dt>
                <dd>maria@biblion.com.br</dd>
              </div>
              <button title="Editar e-mail">✏️</button>
            </div>

            <div className={styles.accountRow}>
              <div>
                <dt>Senha</dt>
                <dd>••••••••••</dd>
              </div>
              <button title="Alterar senha">✏️</button>
            </div>
          </dl>
        </section>

        <section>
          <h2>Gerenciar Lista</h2>

          <div className={styles.listMeta}>
            <button id="btn-add-book" onClick={toggleForm}>
              {formOpen ? (
                <>
                  <i className="fa-solid fa-minus"></i> Fechar Formulário
                </>
              ) : (
                <>
                  <i className="fa-solid fa-plus"></i> Cadastrar Livro
                </>
              )}
            </button>
            <p>{bookCount} livros na lista</p>
          </div>

          <form className={`${formOpen ? styles.open : ""}`}>
            <span className={styles.formDivider}></span>

            <fieldset>
              <div className={styles.field}>
                <label htmlFor="title">Título</label>
                <input
                  ref={titleRef}
                  type="text"
                  id="title"
                  placeholder="Harry Potter"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="author">Autor</label>
                <input
                  type="text"
                  id="author"
                  placeholder="J.K. Rowling"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="gender">Gênero</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option value="" disabled>
                    Selecione um gênero
                  </option>
                  <option>Romance</option>
                  <option>Ficção Científica</option>
                  <option>Fantasia</option>
                  <option>Suspense / Thriller</option>
                  <option>Terror</option>
                  <option>Biografia</option>
                  <option>Autoajuda</option>
                  <option>Literatura Clássica</option>
                  <option>Poesia</option>
                  <option>Outro</option>
                </select>
              </div>

              <div className={`${styles.field} ${styles.descriptionField}`}>
                <label htmlFor="description">
                  Descrição
                  <small>(opcional)</small>
                </label>
                <textarea
                  id="description"
                  placeholder="Não gostei, achei muito cansativo porque..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
            </fieldset>

            <menu>
              <button onClick={handleSaveBook}>Cadastrar</button>
              <button onClick={handleCleanForm}>Limpar</button>
            </menu>
          </form>
        </section>
      </main>
    </div>
  );
}
