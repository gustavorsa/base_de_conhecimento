import { Button, Form, Input, Row, Col, Checkbox } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import FormUser from '../../components/form/FormUserant';
import TableUser from '../../components/table/TableUser';
import { api, baseApiUrll, getUser, postUser, showError } from '../../config/global';
import { AuthContext, AuthProvider } from '../../contexts/auth';

const Container = styled.div `
    padding: 20px 10px;
`
const layout = {
  layout : "vertical"
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
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [massage, setMassage] = useState("")
  
  useEffect(() => {
    (async() => {
      const response = await getUser()
      setUsers(response.data)
    })()
  }, []);

  const response = (values) => {
    const user = values
    api.post(`${baseApiUrll}/users`, user)
    .then(() => {
      setMassage('Cadastrado com Sucesso')
    })
    .catch(response => setMassage(response.response.data))
  }

  const deleteUser = () => {
    api.delete(`${baseApiUrll}/users/${id}`)
    .then(() => {
      setMassage('Cadastrado com Sucesso')
    })
    .catch(response => setMassage(response.response.data))
  }

    return (
      <Container>
        <Form {...layout} name="nest-messages" onFinish={response} validateMessages={validateMessages}>
          <Row gutter={20} style={{
                paddingLeft: 10,
                paddingRight: 10,
                margin: 0,
                maxWidth: 1200
              }}>
            <Col span={24}>
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                rules={[
                  {
                    type: 'email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
            </Col>
            <Col span={12}>
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
                <Button>
                  Cancelar
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <p>{massage}</p>
        <TableUser props={users}/>
      </Container>
    );
};

export default AdminPage;