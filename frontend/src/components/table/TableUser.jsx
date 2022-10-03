import React from 'react';
import 'antd/dist/antd.css';
import { Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'CPNJ',
    dataIndex: 'cnpj',
    key: 'cnpj',
    responsive: ['md']
  },
  {
    title: 'E-mail',
    dataIndex: 'address',
    key: 'address',
    responsive: ['md']
  },
  {
    title: 'Admin',
    dataIndex: 'admin',
    key: 'admin',
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
const data = [
  {
    key: '1',
    name: 'Gustavo Ruschel dos Santos',
    cnpj: '09.130.089/0001-85',
    admin: 'S',
    address: 'johnbrown@hotmail.com',
  },
  {
    key: '2',
    name: 'Jim Green',
    cnpj: '32.808.732/0001-07',
    admin: 'S',
    address: 'jimgreen@hotmail.com',
  },
  {
    key: '3',
    name: 'Joe Black',
    cnpj: '05.538.625/0001-25',
    admin: 'S',
    address: 'joeblack@hotmail.com',
  },
  {
    key: '4',
    name: 'Joe Black',
    cnpj: '05.538.625/0001-25',
    admin: 'S',
    address: 'joeblack@hotmail.com',
  },
  {
    key: '5',
    name: 'Joe Black',
    cnpj: '05.538.625/0001-25',
    admin: 'S',
    address: 'joeblack@hotmail.com',
  },
  {
    key: '6',
    name: 'Joe Black',
    cnpj: '05.538.625/0001-25',
    admin: 'S',
    address: 'joeblack@hotmail.com',
  },
];

const TableUser = () => <Table columns={columns} dataSource={data} />;

export default TableUser;