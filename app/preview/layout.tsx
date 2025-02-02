export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative flex min-h-screen flex-col">{children}</main>
    </div>
  );
}
