import Header from "../components/header";
import styles from "@/styles/Home.module.scss";
import Footer from "../components/footer/index";
import axios from "axios";
import db from "../utils/db";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
export default function Home({ country }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <Main />
      </div>
      <Footer country={country} />
    </div>
  );
}
export async function getServerSideProps() {
  let data = await axios
    .get("https://api.ipregistry.co/?key=ucvi2cdxrj20rjng")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
    },
  };
}
