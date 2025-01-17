import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import {Brightness2Rounded, Brightness6Rounded, WbSunnyRounded} from "@material-ui/icons";
import {useEffect, useState} from "react";
import SimpleMenu from "../Menu/Menu";
import Image from "next/image";


const Layout = ({children}) => {
    const [theme, setTheme] = useState("light");


    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme", localStorage.getItem("theme")
        );

        const no_theme = localStorage.getItem("theme");
        if (!no_theme) {
            localStorage.setItem("theme", "light");
        }

        setTheme(localStorage.getItem("theme"));
    }, []);

    console.log("hehe");

    const switchTheme = () => {
        if (theme === "light") {
            saveTheme("dark");

        } else {
            saveTheme("light");
        }
    };

    const saveTheme = (theme) => {
        setTheme(theme);
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute('data-theme', theme);
    }


    return (
        <div>
            <div className={styles.navbar}>
                <SimpleMenu />
            </div>
            <div className={styles.container}>
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>


                <header className={styles.header}>
                   <Link href="/">
                       <img alt="File:Continents.svg"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Continents.svg/585px-Continents.svg.png"
                            decoding="async"
                            srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Continents.svg/878px-Continents.svg.png 1.5x, https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Continents.svg/1170px-Continents.svg.png 2x"
                            data-file-width="360" data-file-height="200" width="360" height="200" />
                   </Link>
                </header>

                <div className={styles.themeSwitcher}>
                    <button className={styles.themeSwitcher} onClick={switchTheme}>
                        {theme === "light" && <Brightness2Rounded />}
                        {theme === "dark" && <WbSunnyRounded />}
                        {(!theme) && <WbSunnyRounded />}
                    </button>
                </div>

                <main className={styles.main}>
                    {children}
                </main>

                <footer className={styles.footer}>
                    <div>
                        Jan says thx <sup>2</sup> Thu Nghiem for that <a href="https://www.youtube.com/watch?v=v8o9iJU5hEA">Tutorial</a><br />
                        &copy; 2020 by the opensource-world. Also Tributes <sup>2</sup> React and Next.js
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;