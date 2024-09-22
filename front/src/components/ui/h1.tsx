import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const TypographyH1 = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const _className = cn(
    "text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl",
    className
  );

  return <h1 className={_className}>{children}</h1>;
};

export const TypographyH2 = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
      {children}
    </h2>
  );
};

export const TypographyH3 = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

export const TypographyH4 = ({ children }: { children: ReactNode }) => {
  return (
    <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
};

export const Typography = ({ children }: { children: ReactNode }) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};

export const TypographySmall = ({ children }: { children: ReactNode }) => {
  return <small className="text-sm font-medium leading-none">{children}</small>;
};

export const TypographyBlockquote = ({ children }: { children: ReactNode }) => {
  return (
    <blockquote className="mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
      {children}
    </blockquote>
  );
};

export const TypographyUnorderedList = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
};

export const TypographyInlineCode = ({ children }: { children: ReactNode }) => {
  return (
    <code className="relative rounded bg-slate-100 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400">
      {children}
    </code>
  );
};

export const TypographySubtle = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-sm text-slate-500 dark:text-slate-400">{children}</p>
  );
};
