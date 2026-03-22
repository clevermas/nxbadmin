export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center">
      <main className="w-full">
        <section className="flex justify-center">
          <div className="container max-w-md">{children}</div>
        </section>
      </main>
    </div>
  );
}
