interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <label>
      Email
      <input
        type="email"
        placeholder="seu@email.com"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </label>
  );
}
