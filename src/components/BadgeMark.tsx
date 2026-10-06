import { findLogo } from "@/lib/logos";

/** A trust badge: the official logo if its file exists in /public/logos, otherwise a plain text wordmark. */
export function BadgeMark({
  badgeKey,
  name,
  className = "h-8 sm:h-9",
  textClassName = "font-display text-2xl font-extrabold uppercase leading-none",
}: {
  badgeKey: string;
  name: string;
  className?: string;
  textClassName?: string;
}) {
  const logo = findLogo(badgeKey);
  if (!logo) return <span className={textClassName}>{name}</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={logo} alt={name} className={`${className} w-auto max-w-[140px] object-contain`} />;
}
