
interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'info' | 'destructive';
}

export const StatusBadge = ({ status, variant = 'info' }: StatusBadgeProps) => {
  return (
    <span className={`modern-status-badge ${variant}`}>
      {status}
    </span>
  );
};
