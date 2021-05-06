import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalContent = ({ content, isComplete }) => {
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
        <p>内容：{content}</p>
        <p>状态：{isComplete ? "完成" : "未完成"}</p>
      </Modal>
    </>
  );
};

export default ModalContent;