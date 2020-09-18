import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import CategoryList from "./category";

const Content = () => {
  return <p>ini value content</p>;
};

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Assignment 3</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <CategoryList />
        </main>
        <style jsx>{`
          p {
            color: blue;
          }
      `}</style>
      </div>
    </Layout>
  );
}