import Head from 'next/head';
import DataTab from '../components/DataTab';
import styles from './page.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Data Tab</title>
        <meta name="description" content="Next.js app that fetches and displays data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next.js Data App</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <DataTab />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Footer content here</p>
      </footer>
    </div>
  );
};

export default Home;
