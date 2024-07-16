import Link from 'next/link';
import styles from './styles.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
          {session?.user && (
            <Link href="/dashboard" className={styles.dashboardButton}>
              Meu painel
            </Link>
          )}
        </nav>

        {status === 'loading' ? (
          <></>
        ) : session ? (
          <div className={styles.containerLogout} onClick={() => signOut()}>
            <Image
              src="https://lh3.googleusercontent.com/a/ACg8ocIAtaLHV8E0b5qh-R-rB3S-KTu7j1fSLQqkFE1Kp7M15dNiHtKq=s96-c"
              alt="Imagem de perfil do Gogle"
              id="profilePicture"
              className={styles.profilePicture}
              width={50}
              height={50}
            />

            <div className={styles.textLogout}>SAIR</div>

            {/* <button
              id="buttonLogout"
              className={styles.loginButton}
              onMouseOver={handleMouseOverLogoutButton}
              onMouseOut={handleMouseOutLogoutButton}
              onClick={() => signOut()}
            >
              {buttonLogoutText}
            </button> */}
          </div>
        ) : (
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
        )}
      </section>
    </header>
  );
}
