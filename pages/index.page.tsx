import {Layout} from "components/layout";
import {observer} from 'mobx-react';
import axios from 'axios';
import { useEffect } from "react";

const Home = (() => {
  // useEffect(() => {
  //   async function fetchCurrentRates() {
  //     const response = await axios.get('https://rest.coinapi.io', )
  //   }
  // },[]);
  return (
    <Layout></Layout>
  );
});

export default observer(Home);