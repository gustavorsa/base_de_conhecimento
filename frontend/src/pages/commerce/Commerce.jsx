import React, { useEffect, useState } from 'react';
import SidebarAnt from '../../components/sidebar/sidebarAnt/SidebarAnt';
import { PageTitle } from '../../components/title/PageTitle';
import { getArticles, getCategories } from '../../config/global';
import './Commerce.css'

const Commerce = () => {
    const [articles, setArticles] = useState({});
    const [state, setstate] = useState({});

    useEffect(() => {
      (async() => {
        const response = await getArticles()
        setArticles(response.data.data)
      })()
    }, []);

    return (
      <div>
        <PageTitle pageTitle='Commerce' />
        <SidebarAnt articlesList={articles}/>
      </div>
    );
  };

export default Commerce;