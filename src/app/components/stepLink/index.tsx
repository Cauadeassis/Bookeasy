import styles from "./styles.module.css";

interface StepLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function StepLink({ onClick, children }: StepLinkProps) {
  return (
    <button type="button" className={styles.stepLinkButton} onClick={onClick}>
      {children}
    </button>
  );
}
