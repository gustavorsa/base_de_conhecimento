import { Button, Form, Input, Row, Col, Checkbox, Table, Space, notification } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import FormUser from '../../components/form/FormUser';
import TableUser from '../../components/table/TableUser';
import { api, baseApiUrll, getUser} from '../../config/global';
import Notification from '../../components/notification/Notification';

const Container = styled.div `
    padding: 20px 10px;
`
const layout = {
  layout : "vertical",
};

const validateMessages = {
required: '${label} não informado!',
types: {
  email: '${label} Email não é valido!',
},
number: {
  range: '${label} must be between ${min} and ${max}',
},
};


const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [name, setName] = useState({});
  const [email, setemail] = useState({});
  const [password, setPassword] = useState({});
  const [confirmPassword, setConfirmPassword] = useState({})
  const [mode, setMode] = useState('Salvar')
  const [form, setForm] = useState()

  useEffect(() => {
    (async() => {
      const response = await getUser()
      setUsers(response.data)
    })()
  }, []);

  const saveEdit = (values) => {
    const user = values
    const method = (user.id ? api.put : api.post)
    const id = (user.id ? `/${user.id}`: ``)
    method(`${baseApiUrll}/users${id}`, user)
    .then(() => {
      notification.open({
        message: 'Cadastro De Usuario',
        description:
          'Cadastrado realizado com sucesso!',
      })
      reset
    })
    .catch((response) => 
      /*notification.open({
      message: 'Cadastro De Usuario',
      description:
        (response.response.data),
    })*/ console.log(response))
  }

  const loadUser = () => {
    useEffect(() => {
      (async() => {
        const response = await getUser()
        setUsers(response.data)
      })()
    }, []);
  }

  const remove = () => {
    const id = users.id
    api.delete(`${baseApiUrll}/users${id}`)
    .then(() => {
      notification.open({
        message: 'Cadastro De Usuario',
        description:
          'Cadastrado realizado com sucesso!',
      })
      reset
    })
    .catch()
  }

  const reset = (values) => {
    values = ''
    setMode('Salvar')
    setName(name == '')
    setemail(e.target.value = '')
    setPassword(e.target.value = '')
    setConfirmPassword(e.target.value = '')
    loadUser
  }

  const columns = [
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
    /*{
      title: 'CPNJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
      responsive: ['md']
    },*/
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
            <a onClick={() => setMode('Excluir')}>Excluir</a>
          </Space>
      ),
    },
  ];

    return (
      <Container>
        <Form {...layout} name="nest-messages" onFinish={saveEdit} validateMessages={validateMessages}>
          <Row gutter={20} style={{
                paddingLeft: 10,
                paddingRight: 10,
                margin: 0,
              }}>
            <Col md={12} sm={24} xs={24}>
              <Form.Item
                name="name"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input 
                placeholder='Nome do Usuario'/>
              </Form.Item>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <Form.Item
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                rules={[
                  {
                    type: 'email',
                    required: true,
                  },
                ]}
              >
                <Input placeholder='E-mail do Usuario'/>
              </Form.Item>
            </Col>
            <Col md={12} sm={24} xs={24}>
            <Form.Item
            name="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              {
                required: true,
                message: 'Informe sua senha!',
              },
            ]}
            hasFeedback
          >
            <Input.Password/>
          </Form.Item>
            </Col>
            <Col md={12} sm={24} xs={24}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirme a Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  dependencies={['user']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Confirme sua Senha!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('As senhas não correspondem!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
            </Col>
            <Col>
            <Form.Item
            name="admin"
            valuePropName="checked"
            value={checkAdmin}
            onChange={(e) => setCheckAdmin(e.target.value)}
            >
              <Checkbox>Admin?</Checkbox>
            </Form.Item>
            </Col>
          </Row>
          <Row justify='end' style={{paddingRight: 20}} gutter={20}>
            <Col>
              <Form.Item>
                <Button onClick={() => (setMode('Salvar'), setName(values == ''), setCheckAdmin())}>
                  Cancelar
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                {(mode == 'Salvar') ? (
                  <Button type="primary" htmlType="submit" onClick={saveEdit}>
                    {mode}
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit" danger onClick={remove}>
                    {mode}
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} dataSource={users} style={{
                paddingLeft: 10,
                paddingRight: 10,
                margin: 0,
              }}/>
      </Container>
    );
};

export default AdminPage;