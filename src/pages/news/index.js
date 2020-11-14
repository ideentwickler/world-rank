import Layout from "../../components/Layout/Layout";
import styles from "./News.module.css";
import homestyles from "../../styles/Home.module.css";
import countriestyles from "../../components/CountriesTable/CountriesTable.module.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import Link from "next/link";

const New = ({news}) => {
    console.log(news);
    return (
        <Layout>
            <div className={homestyles.inputContainer}>
                <div className={homestyles.counts}>
                    <h2>We found {news.length} news for you!</h2>
                </div>
                <div className={homestyles.input}>
                    <SearchInput placeholder="Filter by Titelname" onChange="" />
                </div>
            </div>
            {news.map((news) => (
                <Link href={`/news/${news.id}`}>
                <div className={countriestyles.row}>
                    <div className={countriestyles.flag}>
                        #{news.id}
                    </div>
                    <div className={countriestyles.name}>
                        {news.title}
                    </div>
                </div>
                </Link>
            ))}
            <div className={countriestyles.row}>
                <div className={countriestyles.flag}>
                    #ID
                </div>
                <div className={countriestyles.name}>
                    Titel blal lblslas lafsd
                </div>
            </div>
        </Layout>

    )
}

export const getStaticProps = async() => {
    const res = await fetch("http://jsonplaceholder.typicode.com/posts/");
    const news = await res.json();

    /* const countries = countries_max.slice(0,5);
       nur 0 bis 5 rows!
     */
    return {
        props: {
            news,
        }
    }
}

export default New;