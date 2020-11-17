import Layout from "../../components/Layout/Layout";
import styles from "./News.module.css";
import homestyles from "../../styles/Home.module.css";
import countriestyles from "../../components/CountriesTable/CountriesTable.module.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import Link from "next/link";
import {Announcement, KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import {useState} from "react";
import PaginationOutlined from "../../components/Pagination/Pagination";

const orderBy = (news, value, direction) => {
    if (direction === "desc") {
        return [...news].sort((a,b) =>
            (a[value] > b[value] ? -1 : 1));
    }

    if (direction === "asc") {
        return [...news].sort((a,b) =>
            (a[value] > b[value] ? 1 : -1));
    }

    return news;
}

const SortArrow = ({direction}) => {
    if (!direction) {
        return <></>;
    }

    if (direction==="desc") {
        return (
            <div className={countriestyles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        )
    } else {
        return (
            <div className={countriestyles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        )
    }
}

const New = ({news}) => {
    const [keyword, setKeyword] = useState("");
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc");
        } else if (direction === "desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    };

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    };

    const onInputChange = (e) => {
        setKeyword(e.target.value);
    }

    const orderedNews = orderBy(news, value, direction);

    const filteredNews = orderedNews.filter(news =>
        news.title.toLowerCase().includes(keyword)
    );


    return (
        <Layout>
            <div className={homestyles.inputContainer}>
                <div className={homestyles.counts}>
                    <h2>We found {filteredNews.length} news for you!</h2>
                </div>
                <div className={homestyles.input}>
                    <SearchInput placeholder="Filter by Titelname" onChange={onInputChange} />
                </div>
            </div>
            <div className={countriestyles.heading}>
                <div className={countriestyles.row_button}>
                    <button className={countriestyles.heading_id} onClick={() => setValueAndDirection('id')}>
                        <div>ID</div>
                        {value==='id' && <SortArrow direction={direction} />}
                    </button>
                    <button className={countriestyles.heading_title} onClick={() => setValueAndDirection('title')}>
                        <div>TITLE</div>
                        {value==='title' && <SortArrow direction={direction} />}
                    </button>
                </div>
            </div>
            {filteredNews.map((news) => (
                <Link href={`/news/${news.id}`}>
                <div className={countriestyles.row}>
                    <div className={countriestyles.flag}>
                        <Announcement /> {news.id}
                    </div>
                    <div className={countriestyles.name}>
                        {news.title.toUpperCase()}
                    </div>
                </div>
                </Link>
            ))}
            <div className={styles.pagination}>
                <PaginationOutlined count={filteredNews.length} />
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