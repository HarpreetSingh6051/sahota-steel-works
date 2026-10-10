interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <p className="eyebrow">
        <span className="eyebrow-line" aria-hidden="true" />
        {eyebrow}
        {align === "center" && <span className="eyebrow-line" aria-hidden="true" />}
      </p>
      <h2
        className={`font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl ${
          dark ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-ink-300" : "text-ink-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}