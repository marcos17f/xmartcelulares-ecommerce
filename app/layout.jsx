import '../styles/xmart-theme.css';
import '../styles/xmart-pages.css';
import { CartProvider } from '../lib/cart-context';

export const metadata = {
  title: 'X-Mart',
  description: 'Demo dos componentes X-Mart',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
