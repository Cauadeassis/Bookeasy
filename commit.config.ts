import type { UserConfig } from "cz-git";

const config: UserConfig = {
  types: [
    { value: "feat", name: "feat:     ✨  Nova feature" },
    { value: "fix", name: "fix:      🐛  Correção de bug" },
    { value: "docs", name: "docs:     📚  Documentação" },
    { value: "refactor", name: "refactor: ♻️  Refatoração" },
    { value: "test", name: "test:     🧪  Testes" },
    { value: "chore", name: "chore:    🔧  Configuração" },
  ],
  scopes: ["auth", "api", "ui", "config"],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 100,
};
export default config;
