import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './SidebarAnt.css';
import { Divider, Layout, Menu } from 'antd';
import Search from 'antd/lib/transfer/search';
import * as BiIcons from 'react-icons/bi'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getArticlesID } from '../../../config/global';

const { Content, Sider } = Layout;

const LinkEdit = styled(Link)``

const ContentText = styled.div `
  padding: 10;
  min-height: 360;
`

function getItem(label, key) {
  return {
    key,
    label,
  };
}

const SidebarAnt = (props) => {
  const {articlesList, texto} = props
  const [collapsed, setCollapsed] = useState(true);
  const [artigo, setArtigo] = useState();
  const [artigoId, setArtigoId] = useState(1);

  const articleListId = (value) => {
    setArtigoId(value.key)
    console.log('sidebar', value.key)
  }

  useEffect(() => {
    (async() => {
      const articles = await getArticlesID(artigoId)
      setArtigo(articles.data)
    })()
  }, [artigoId]);

  const itemsList = articlesList.data?.map((item, index) => {
    return (
      getItem(item.name, item.id)
      )
  })

  const onSearch = (value) => console.log(value);
  
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width={300}
        style={{
          color: 'black',
        }}
        >
            <div className='searchSide'>
              <Search
                placeholder="Buscar..."
                onSearch={onSearch}
              />
            </div>
            <Divider orientation='left' style={{color: 'white'}}>
              Opções
            </Divider>
            {collapsed ? 
              <LinkEdit to="/editpage" style={{marginLeft: 16}}>
                <BiIcons.BiPlusMedical/>
              </LinkEdit>
            : 
              <LinkEdit to="/editpage" style={{marginLeft: 16}}>
                <BiIcons.BiPlusMedical/> Novo artigo
              </LinkEdit>
            }
            <Divider orientation='left' style={{color: 'white'}}>
              Artigos
            </Divider>
            {collapsed ? '' : 
            <Menu 
              theme="dark" 
              mode="inline" 
              items={itemsList}
              onClick={articleListId}
            />}
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{margin: '16px 16px',}}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 10,
              minHeight: 380,
            }}
          >          
            <ContentText>
                <h1
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10
                  }}
                 dangerouslySetInnerHTML={{__html: artigo?.name}}
                 className="textEditor"></h1>
                <p
                  style={{
                    padding: 10,
                    minHeight: 360,
                  }}
                 dangerouslySetInnerHTML={{__html: artigo?.content}}
                 className="textEditor"></p>
            </ContentText>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default SidebarAnt;