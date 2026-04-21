import "./globals.css";

export const metadata = {
  title: "Veyro",
  description: "Reduce Client Drop-Offs Before They Happen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}