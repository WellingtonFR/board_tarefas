import { GetServerSideProps } from "next";
import styles from "./styles.module.css";
import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { Textarea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface HomeProps {
  user: {
    email: string;
  };
}

interface taskProps {
  id: string;
  createdAt: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<taskProps[]>([]);

  useEffect(() => {
    const loadTarefas = (async () => {
      const tarefasRef = collection(db, "tarefas");
      const q = query(tarefasRef, orderBy("createdAt", "desc"), where("user", "==", user?.email));

      onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        let lista = [] as taskProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            createdAt: doc.data().createdAt,
            user: doc.data().user,
            public: doc.data().public,
          });
        });

        setTasks(lista);
      });
    })();
  }, [user?.email]);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    await addDoc(collection(db, "tarefas"), {
      tarefa: input,
      createdAt: new Date(),
      user: user?.email,
      public: publicTask,
    });

    setInput("");
    setPublicTask(false);

    try {
    } catch (error) {
      console.log(error);
    }
  }

  async function handleshare(id: string) {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}/`);
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa ?</h1>

            <form className={styles.form} onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Digite aqui sua tarefa ..."
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
              />

              <div className={styles.checkboxArea}>
                <input type="checkbox" className={styles.checkbox} checked={publicTask} onChange={handleChangePublic} />
                <label>Deixar tarefa pública?</label>
              </div>

              <button type="submit" className={styles.button}>
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          {tasks.map((item) => (
            <article className={styles.task} key={item.id}>
              <div className={styles.taskHeader}>
                {item.public == true ? (
                  <div className={styles.tagContainer}>
                    {item.public === true ? (
                      <Link href={`/task/${item.id}`}>
                        <label className={styles.tag}>PÚBLICO</label>
                      </Link>
                    ) : (
                      <label className={styles.tag}>PÚBLICO</label>
                    )}

                    <button className={styles.shareButton}>
                      <FiShare2 size={22} color="#3183ff" />
                    </button>
                  </div>
                ) : (
                  <div className={styles.tagContainer}></div>
                )}

                <button className={styles.trashButton}>
                  <FaTrash
                    size={24}
                    color="#ea3140"
                    className={styles.trashIcon}
                    onClick={() => handleDeleteTask(item.id)}
                  />
                </button>
              </div>

              <div className={styles.taskContent}>
                <p>{item.tarefa}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  console.log(session?.user?.email);

  // if (!session?.user) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      user: {
        email: session?.user?.email,
      },
    },
  };
};
