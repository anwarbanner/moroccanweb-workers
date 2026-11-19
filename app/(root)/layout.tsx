export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ background: '#0B1220', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  );
}
