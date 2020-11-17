import React from "react";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css"
import CountriesTable from "../components/CountriesTable/CountriesTable";
import {useState} from "react";
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

const NEWS_QUERY = gql`query MyQuery {
    news {
        id
        title
        body
    }
}`


export default function Home( {countries} ) {
  const [keyword, setKeyword] = useState("");

    const { data, loading, error } = useQuery(NEWS_QUERY);
    console.log(data);
    console.log(loading);
    console.log(error);

    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
      // e.preventDefault();
      setKeyword(e.target.value.toLowerCase());
  }

  return (
      <Layout>
        <div className={styles.inputContainer}>
            <div className={styles.counts}>
                Found {filteredCountries.length} countries
            </div>

            <div className={styles.input}>
                <SearchInput placeholder="Filter by Name, Region or SubRegion" onChange={onInputChange} />
            </div>

        </div>

        <CountriesTable countries={filteredCountries.slice(0,3)}/>
      </Layout>
  );
}

/* getStaticProps: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
*/
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
