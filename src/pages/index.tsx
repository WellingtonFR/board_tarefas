import Head from "next/head";

import styles from "@/styles/Home.module.css";
import Image from "next/image";

import logoImg from "../../public/assets/hero.png"

export default function Home() {
  return (
    <>
      <Head>
        <title>Organizador de tarefas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
      <div className={styles.logoContent}>
        <Image src={logoImg} alt="Logo" className={styles.logo} priority/>
      </div>
        <h1 className={styles.title}>Sistema para organização de suas tarefas</h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+12 mil posts</span>
          </section>
          <section className={styles.box}>
            <span>+90 comentários</span>
          </section>
        </div>
      </main>
    </>
  );
}
