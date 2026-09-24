export function Loading({ label = "در حال بارگذاری" }: { label?: string }) {
  return <span className="ui-loading" role="status" aria-live="polite">{label}</span>;
}