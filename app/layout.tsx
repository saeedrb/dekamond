import "../styles/globals.scss";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <div className="container">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
