import { notification } from 'antd';
import React from 'react';



const Notification = ({title, massage}) => (
  notification.open({
    message: {title},
    description:
      {massage},
  })
);

export default Notification;