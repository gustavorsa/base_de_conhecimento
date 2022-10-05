import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Row, Col, Checkbox } from 'antd';

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

  const onFinish = (values) => {
    console.log(values);
  };

  const onCheckboxChange = (e) => {
    setCheckAdmin({admin : true});
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
          >
            <Checkbox checked={checkAdmin} onChange={onCheckboxChange}>
              Admin?
            </Checkbox>
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