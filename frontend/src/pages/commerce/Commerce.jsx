import React, { useEffect, useState } from 'react';
import SidebarAnt from '../../components/sidebar/sidebarAnt/SidebarAnt';
import { PageTitle } from '../../components/title/PageTitle';
import { getArticles, getArticlesID} from '../../config/global';
import { Buffer } from "buffer";
import './Commerce.css';

const Commerce = () => {
    const [articles, setarticles] = useState({});
    const [articlesId, setArticlesId] = useState({});

    useEffect(() => {
      (async() => {
        const articles = await getArticles()
        const articlesID = await getArticlesID(50)
        setarticles(articles.data)
        setArticlesId(articlesID.data)
      })()
    }, []);
    
    
    /*const buffer = articles.content
    console.log(buffer)*/
    /*const text = buffer.toString("utf8")
    console.log('Artigos', text)*/
    //console.log('Commerce',articles.data)

    return (
      <div>
        <PageTitle pageTitle='Commerce' />
        <SidebarAnt articlesList={articles} texto={articlesId}/>
      </div>
    );
  };

export default Commerce;