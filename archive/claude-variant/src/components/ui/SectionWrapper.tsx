"use client";

import clsx from "clsx";

interface SectionWrapperProps {
  id: string;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function SectionWrapper({
  id,
  className,
  fullWidth = false,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-20 py-20 md:py-28 px-6 md:px-12 lg:px-20",
        !fullWidth && "max-w-[1200px] mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
}
