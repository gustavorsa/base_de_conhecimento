import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Row, Col, Checkbox } from 'antd';
import { api, baseApiUrll } from '../../config/global';
import axios from 'axios';

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

const FormUser = () => {
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const onFinish = (values) => {
    console.log('values', values);
  };

  const Save = (values) => {
    const user = values
    axios.post(`${baseApiUrll}/users`, {user})
    .then((res) => {
        console.log(res.msg)
        })
    .catch(err => console.log(err))
    console.log('valores',values)
  }

  return (
    <Form {...layout} name="nest-messages" onFinish={Save} validateMessages={validateMessages}>
      <Row gutter={20} style={{
            paddingLeft: 10,
            paddingRight: 10,
            margin: 0,
           // maxWidth: 600
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
              name="confirm"
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
        valuePropName=""
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
  );
};

export default FormUser;