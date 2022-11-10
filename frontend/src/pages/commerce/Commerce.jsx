import React, { useEffect, useState } from 'react';
import SidebarAnt from '../../components/sidebar/sidebarAnt/SidebarAnt';
import { PageTitle } from '../../components/title/PageTitle';
import { getArticles, getArticlesID, getCategories } from '../../config/global';
import './Commerce.css'

const Commerce = () => {
    const [articles, setArticles] = useState({});

    useEffect(() => {
      (async() => {
        const response = await getArticlesID(44)
        setArticles(response.data)
      })()
    }, []);

    console.log('Artigos', articles.content)

    return (
      <div>
        <PageTitle pageTitle='Commerce' />
        <SidebarAnt articlesList={articles} texto={articles}/>
      </div>
    );
  };

export default Commerce;