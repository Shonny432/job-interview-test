/** Рендерит текст, превращая фрагменты в `обратных кавычках` в инлайн-код. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") && part.length > 1 ? (
          <code
            key={i}
            className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm leading-relaxed text-zinc-100 dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
      <code>{code}</code>
    </pre>
  );
}
