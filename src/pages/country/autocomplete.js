import AutoCompleteInput from "../../components/AutoComplete/AutoCompleteInput";
import Layout from "../../components/Layout/Layout";
import styles from "./autocomplete.module.css"


export default function AutoComplete( {countries} )  {

    const ClickAndGet = (e) => {
        console.log(e.target.value)
    }

    console.log(countries);
    return (
        <Layout>
            <div className={styles.heading}>
                <div className={styles.input}>
                    <AutoCompleteInput countries={countries} ClickAndGet={ClickAndGet} />
                </div>
            </div>
        </Layout>
    )
}


export const getStaticProps = async() => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();

    /* const countries = countries_max.slice(0,5);
       nur 0 bis 5 rows!
     */
    return {
        props: {
            countries,
        }
    }
}