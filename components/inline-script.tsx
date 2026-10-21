/**
 * Инлайн-скрипт, который выполняется только при разборе HTML с сервера.
 * При рендере на клиенте (например, при смене языка перерисовывается корневой layout)
 * React предупреждает о <script> — там он всё равно не выполнится, поэтому делаем его `text/plain`.
 * suppressHydrationWarning гасит расхождение атрибута type между сервером и клиентом.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
