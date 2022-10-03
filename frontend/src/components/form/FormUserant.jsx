import React from 'react';
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
  const onFinish = (values) => {
    console.log(values);
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
            name={['user', 'name']}
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
            name={['user', 'email']}
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
              name={['user', 'password']}
              label="Senha"
              rules={[
                {
                  required: true,
                  message: 'Informe sua senha!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
              name={['user', 'confirm']}
              label="Confirme a Senha"
              dependencies={['password']}
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
          <Checkbox>Admi?</Checkbox>
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