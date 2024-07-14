import Link from 'next/link';
import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <h1>
              <span>{'{ '}</span>
              <span> &#9745;</span>Tarefas
              <span>{' }'}</span>
            </h1>
          </Link>
          <Link href="/dashboard" className={styles.dashboardButton}>
            Meu painel
          </Link>
        </nav>

        <button className={styles.loginButton}>Login</button>
      </section>
    </header>
  );
}
