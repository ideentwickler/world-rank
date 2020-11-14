import Layout from "../../components/Layout/Layout";
import styles from './News.module.css'
import Link from "next/link";

const getNews = async (id) => {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${id}`);
    const get_news = await res.json();
    return get_news;
};

const News = ({ news }) => {
    /*
    * mit Object.values(obj) die values erhalten!
    */
    const k = Object.values(news);
    const title = k[2];
    const body = k[3];

    return (
        <Layout title={title}>
           <div className={styles.container}>
               <div className={styles.news_panel}>
                   <div className={styles.news_title}>
                       {title.toUpperCase()}
                   </div>
                   <div className={styles.news_body}>
                       {body}
                   </div>
                   <div className={styles.back}>
                       <Link href="/news">
                           back to the news!
                       </Link>
                   </div>
               </div>
           </div>
        </Layout>
    );
};

export default News;

export const getStaticPaths = async () => {
    const res = await fetch("http://jsonplaceholder.typicode.com/posts");
    const news_path = await res.json();

    const paths = news_path.map((news) => ({
        params: { id: news.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {
    const news = await getNews(params.id);
    return {
        props: {
            news,
        },
    };
};