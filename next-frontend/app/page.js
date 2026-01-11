import Head from 'next/head';
import DataTab from '../components/DataTab';
import styles from './page.module.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Trip Manager</title>
        <meta name="description" content="CRUD App" />
      </Head>

      <main className={styles.container}>
        <DataTab />
      </main>
    </div>
  );
};

export default Home;
