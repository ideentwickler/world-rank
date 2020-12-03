import React, {useEffect} from "react";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css"
import CountriesTable from "../components/CountriesTable/CountriesTable";
import {useState} from "react";
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import AutoCompleteInput from "../components/AutoComplete/AutoCompleteInput";


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

    const filteredCountries = countries.filter(country =>
      country.name.slice(0,1).toLowerCase().startsWith(keyword) ||
      country.name.toLowerCase().startsWith(keyword) ||
      country.region.toLowerCase().startsWith(keyword) ||
      country.subregion.toLowerCase().startsWith(keyword)
    );

    const filteredTest = (keyword) => {
        if (keyword.length >= 2) {
            return countries.filter(country =>
                country.name.toLowerCase().startsWith(keyword) ||
                country.region.toLowerCase().startsWith(keyword) ||
                country.subregion.toLowerCase().startsWith(keyword)
            );
        } else {
            return countries.filter(country =>
                country.name.slice(0,1).toLowerCase().startsWith(keyword)
            );
        }
    }

    useEffect(() => {
        console.log(filteredTest(keyword));
        console.log(keyword.length)
    }, [keyword]);

    var array_of_letters = []
    const firstLetters = () => countries.map((country) => {
            let letter = country.name.slice(0, 1);
            if (array_of_letters.indexOf(letter) === -1) {
                array_of_letters.push(country.name.slice(0, 1));
            }
        }
    );
    firstLetters();


  const onInputChange = (e) => {
      // e.preventDefault();
      setKeyword(e.target.value.toLowerCase());
  }

  const onInputClick = (e) => {
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

          <div className={styles.abc}>
              {array_of_letters.sort().map((key) =>
                  <div className={styles.abc_one}>
                      <button value={key} onClick={onInputClick}>
                          {key}
                      </button>
                  </div>)}
          </div>
        <CountriesTable countries={filteredTest(keyword)}/>
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
