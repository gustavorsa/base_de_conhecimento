import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './SidebarAnt.css';
import { Breadcrumb, Button, Col, Divider, Layout, Menu, Row } from 'antd';
import Search from 'antd/lib/transfer/search';
import * as BiIcons from 'react-icons/bi'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const { Content, Sider } = Layout;

const LinkEdit = styled(Link)``

const ContentText = styled.div `
  padding: 10;
  min-height: 360;
`

function getItem(label, key, children) {
  return {
    key,
    children,
    label,
  };
}

const SidebarAnt = (props) => {
  const {articlesList, texto} = props
  const [collapsed, setCollapsed] = useState(true);

  const itemsList = articlesList.data?.map((item, index) => {
    return getItem(item.name)
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
        width={364}
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
              className={collapsed ? '' : 'MenuArticles'}
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
              minHeight: 360,
            }}
          >          
            <ContentText>
                <p
                  style={{
                    padding: 10,
                    minHeight: 360,
                  }}
                 dangerouslySetInnerHTML={{__html: texto.content}}
                 className="textEditor"></p>
            </ContentText>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default SidebarAnt;