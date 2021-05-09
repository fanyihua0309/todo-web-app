import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalDetails = ({ create, content, complete}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        详情
      </Button>
      <Modal title="待办事项详情" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
        <p>创建时间：{create}</p>
        <p>内容详情：{content}</p>
        <p>完成状态：{complete}</p>
      </Modal>
    </>
  );
};

export default ModalDetails;