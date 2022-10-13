import React from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';

const TableUser = ({props}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: props.id,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: props.name,
    },
    {
      title: 'CPNJ',
      dataIndex: 'cnpj',
      key: props.cnpj,
      responsive: ['md']
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: props.email,
      responsive: ['md']
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: props.name,
      responsive: ['md']
    },
    {
      title: 'Opções',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            <EditOutlined style={{fontSize: '20px'}}/>
            <a>Editar</a>
            <DeleteOutlined style={{color: '#eb2f2f', fontSize: '20px'}}/>
            <a>Excluir</a>
          </Space>
      ),
    },
  ];

  return (
      <Table columns={columns} dataSource={props} />
  )
};

export default TableUser;