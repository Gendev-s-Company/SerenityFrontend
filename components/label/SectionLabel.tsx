export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
      {children}
    </p>
  );
}