import { Button, Form, Input, Row, Col, Checkbox, Table, Space, notification, Modal } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { api, baseApiUrll, getUser} from '../../config/global';
import 'antd/dist/antd.css';
import { PageTitle } from '../../components/title/PageTitle';

const Container = styled.div `
    padding: 20px 20px;
`
const layout = {
  layout : "vertical",
};

const validateMessages = {
required: '${label} não informado!',
types: {
  email: '${label} não é valido!',
},
number: {
  range: '${label} must be between ${min} and ${max}',
},
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [user, setuser] = useState({});
  const [userMap, setUserMap] = useState({id: 0, content: ''});
  const [requiredPassword, setRequiredPassword] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    (async() => {
      const response = await getUser()
      setUsers(response.data)
    })()
  }, []);

  const saveEdit = (values) => {
    const userForm = values
    const id = (user.id ? `/${user.id}`: ``)
    const method = (user.id ? api.put : api.post)
    method(`${baseApiUrll}/users${id}`, userForm)
    .then(() => {
      notification.open({
        message: 'Cadastro De Usuário',
        description:
          'Cadastrado realizado com sucesso!',
      })
      loadUsers()
      cancelar()
      setEdit(false)
    })
    .catch((response) => 
      notification.open({
      message: 'Cadastro De Usuário',
      description: (response.response),
    }))
  }

  const loadUsers = async () => {
      const response = await getUser()
      setUsers(response.data)
  }

  const remove = (record) => {
    Modal.confirm({
      title: 'Deseja excluir o cadastro?',
      okText: 'Sim',
      cancelText: 'Cancelar',
      okType: 'danger',
      onOk: () => {
        setUsers(() => {
          const userUpdate = users.filter(user => record.id == user.id)
          const id = userUpdate[0].id
          api.delete(`${baseApiUrll}/users/${id}`)
          .then(() => {
            notification.open({
              message: 'Cadastro De Usuário',
              description:
                'Usuário foi excluido!',
            })
          loadUsers()
          })
          .catch(() => {
            notification.open({
              message: 'Cadastro De Usuário',
              description:
                (response.response.data),
            })
          })
        })
      }
    })
  }

  const editUser = (record) => {
    setEdit(true)
    setuser(record)
    setRequiredPassword(false)
    form.setFieldsValue(
      {
        name : record.name, 
        email: record.email,
        password: '',
        confirmPassword: '',
        admin: record.admin ? true : false
      }
    )
  }

  const cancelar = () => {
    setEdit(false)
    setuser({})
    form.setFieldsValue(
      {
        name : '', 
        email: '',
        password: '',
        confirmPassword: '',
        admin: false
      }
    )
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
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
      render: (record) => (
          <Space >
            <EditOutlined style={{fontSize: '20px'}}/>
            <Button type='link' onClick={() => editUser(record)}>Editar</Button>
            <DeleteOutlined style={{color: '#eb2f2f', fontSize: '20px'}}/>
            <a onClick={() => remove(record)}>Excluir</a>
          </Space>
      ),
    },
  ];

    return (
      <Container>
        <PageTitle pageTitle="Administrador"/>
        <Button 
        onClick={editUser}
        type='primary'
        style={{
          marginBottom: 20,
        }}>
           Novo Usuário       
        </Button>
        <Modal
          title="Usuário"
          open={edit}
          width={1220}
          onOk={cancelar}
          onCancel={cancelar}
        >
          <Form
            form={form}
            onFinish={saveEdit}
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              margin: 0,
            }}
            >
            <Row gutter={20}>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                  name="name"
                  label="Nome"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  >
                  <Input/>
                </Form.Item>
              </Col>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  value={"email"}
                  rules={[
                    {
                      type: 'email',
                      required: true,
                    },
                  ]}
                  >
                  <Input/>
                </Form.Item>
              </Col>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                name="password"
                label="Senha"
                value={"password"}
                rules={[
                  {
                    required: requiredPassword,
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
                  value="confirmPassword"
                  dependencies={['user']}
                  hasFeedback
                  rules={[
                    {
                      required: requiredPassword,
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
                  value="admin"
                >
                  <Checkbox>Admin?</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row justify='end' style={{paddingRight: 20}}>
              <Col>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={saveEdit}>
                      Salvar
                    </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Table 
          columns={columns}
          dataSource={users}
        />
      </Container>
    );
};

export default AdminPage;