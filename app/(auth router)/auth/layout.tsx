import css from './page.module.css'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      {children}
    </div>
  );
}

