import Link from 'next/link';
import styles from './styles.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function Header() {
  const { data: session, status } = useSession();
  const [buttonLogoutText, setButtonLogoutText] = useState(session?.user?.name?.split(' ')[0] || 'Sair');

  useEffect(() => {
    if (session) {
      handleMouseOutLogoutButton();
    }
  }, [session]);

  const handleLogin = () => {
    signIn('google');
    setButtonLogoutText(session?.user?.name?.split(' ')[0] as string);
  };

  const handleMouseOverLogoutButton = () => {
    setButtonLogoutText('Sair');
  };

  const handleMouseOutLogoutButton = () => {
    setButtonLogoutText(session?.user?.name?.split(' ')[0] as string);
  };

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

        {status === 'loading' ? (
          <></>
        ) : session ? (
          <button
            id="buttonLogout"
            className={styles.loginButton}
            onMouseOver={handleMouseOverLogoutButton}
            onMouseOut={handleMouseOutLogoutButton}
            onClick={() => signOut()}
          >
            {buttonLogoutText}
          </button>
        ) : (
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
        )}
      </section>
    </header>
  );
}
