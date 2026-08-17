export function FormStatusBanner({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-error bg-error-pale p-4 text-sm text-error" role="alert">
      {message}
    </div>
  );
}
