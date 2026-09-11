type LoadingProps = {
  text?: string;
};

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-foreground/10 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-background/95 px-5 py-4 shadow-xl shadow-primary/10">
        {/* Small animated loader */}
        <div className="relative h-9 w-9 shrink-0">
          <div className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,var(--primary),var(--blue),var(--pink),var(--orange),var(--primary))] p-0.5">
            <div className="h-full w-full rounded-full bg-background" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center gap-0.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink" />
          </div>
        </div>

        {/* Compact text */}
        <p className="font-heading text-sm font-bold text-foreground">
          {text}
        </p>
      </div>
    </div>
  );
}