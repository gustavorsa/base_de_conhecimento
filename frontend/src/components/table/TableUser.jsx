import React from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
    responsive: ['md']
  },
  {
    title: 'Administrador',
    key: 'admin',
    responsive: ['md'],
    render: (users) => (
      users.admin == true ? 'Sim' : 'Não'
    )
  },
  {
    title: 'Opções',
    key: 'action',
    render: () => (
        <Space size="middle">
          <EditOutlined style={{fontSize: '20px'}}/>
          <a>Editar</a>
          <DeleteOutlined style={{color: '#eb2f2f', fontSize: '20px'}}/>
          <a>Excluir</a>
        </Space>
    ),
  },
];

export const TableUser = ({props}) => {

  return (
      <Table columns={columns} dataSource={props} />
  )
};

export default TableUser;