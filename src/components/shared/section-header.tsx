interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 ${
        align === "center" ? "text-center max-w-2xl mx-auto" : ""
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
