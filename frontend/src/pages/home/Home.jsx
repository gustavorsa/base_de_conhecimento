import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../components/title/PageTitle';
import { baseApiUrll, api, getStats } from '../../config/global';

const Home = () => {
    const [stat, setStat] = useState([]);
    const [stat1, setStat1] = useState([]);

    useEffect(() => {
      api.get(`${baseApiUrll}/stats`)
    .then((resp) => {
        setStat(resp.data)
        })
    .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      (async() => {
        const response = await getStats()
        setStat1(response.data)
      })()
    }, []);

  return (
    <div className='home'>
      <PageTitle pageTitle='Home'/>
      <h1>Home</h1>
      <div>
        <p>stats: {stat.users}</p>
        <p>stats: {stat1.users}</p>
      </div>
    </div>
  );
}

export default Home;