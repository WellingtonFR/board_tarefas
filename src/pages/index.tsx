import { GetStaticProps } from "next";
import Head from "next/head";

import styles from "@/styles/Home.module.css";
import Image from "next/image";

import logoImg from "../../public/assets/hero.png";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface HomeProps {
  posts: number;
  comments: number;
}

export default function Home({ posts, comments }: HomeProps) {
  return (
    <>
      <Head>
        <title>Organizador de tarefas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image src={logoImg} alt="Logo" className={styles.logo} priority />
        </div>
        <h1 className={styles.title}>Sistema para organização de suas tarefas</h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tarefas");

  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);

  return {
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60,
  };
};
