import React from 'react';
import { Layout } from 'antd';
import './EditPage.css'

import ReactDOM from 'react-dom';

const { Content } = Layout;

const EditPage = () => {
    return (
        <Layout className="site-layout">
        <Content
          style={{margin: '16px 16px',}}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 520,
            }}
          >
          </div>
        </Content>
      </Layout>
    );
}

export default EditPage;