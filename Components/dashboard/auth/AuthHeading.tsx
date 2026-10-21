type AuthHeadingProps = {
  title: string;
  description?: string;
};

export function AuthHeading({ title, description }: AuthHeadingProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-[#0e1824]">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
      )}
    </>
  );
}
