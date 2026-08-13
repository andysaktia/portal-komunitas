import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">{eyebrow}</p>
        <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-soft mx-auto max-w-md px-6 py-12 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">{icon}</div>
      <h3 className="mt-4 text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
