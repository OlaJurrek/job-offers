type ErrorMessageProps = {
  css: string;
  errorId: string;
  clientError: string | undefined;
  serverError: string[] | undefined;
};

export default function ErrorMessage({
  css,
  errorId,
  clientError,
  serverError,
}: ErrorMessageProps) {
  return (
    <div id={errorId} aria-live="polite" aria-atomic="true">
      {clientError && <p className={css}>{clientError}</p>}
      {serverError &&
        serverError.map((error: string) => (
          <p className={css} key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}
