import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './SidebarAnt.css';
import { Breadcrumb, Button, Col, Divider, Layout, Menu, Row } from 'antd';
import Search from 'antd/lib/transfer/search';
import * as BiIcons from 'react-icons/bi'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EditorFroala from '../../editorwysiwyg/EditorFroala';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { convertFromRaw } from 'draft-js';

const { Content, Sider } = Layout;

const LinkEdit = styled(Link)``

function getItem(label, key, children) {
  return {
    key,
    children,
    label,
  };
}

const SidebarAnt = (props) => {
  const {articlesList, texto} = props  

  useEffect(() => {
    {articlesList.length > 0 && articlesList.map((articlesList, index) => {
      //return console.log(articlesList.name, articlesList.id)
      //items = [getItem(articlesList.name, articlesList.id)]
      //items = [getItem(articlesList.name, articlesList.id)]
    })}
  }, []);
  
  const itemsUser = [
    getItem('User', 'sub1', [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
  ];

  const items = [
    getItem('User', 'sub1', [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
  ];

  //console.log('sidebar',articlesList)
  //console.log('items', items)

  const onSearch = (value) => console.log(value);

  const [collapsed, setCollapsed] = useState(false);
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
        style={{
            color: 'black',
          }}
        width={364}
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
            {collapsed ? '' : 
            <Menu 
              theme="dark" 
              mode="inline" 
              items={itemsUser} 
            />}
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{margin: '16px 16px',}}
        >
          <Breadcrumb
            style={{
              margin: '5px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {texto.content}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default SidebarAnt;