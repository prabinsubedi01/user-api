
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-primary text-primary-contrast hover:opacity-90 focus-visible:outline-primary',
    secondary:
      'border border-line bg-surface text-fg hover:bg-bg focus-visible:outline-primary',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary}`}
    >
      {children}
    </button>
  );
}
