interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PasswordField({ value, onChange }: EmailFieldProps) {
  return (
    <label>
      senha
      <input
        type="password"
        placeholder="••••••••"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </label>
  );
}
