import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const ModalEdit = ({ content, onClickConfirm }) => {
  const [editContent, seteditContent] = useState(content);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onClickConfirm(editContent);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        编辑
      </Button>
      <Modal title="编辑待办事项" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input value={editContent} onChange={(e) => seteditContent(e.target.value)}/>
      </Modal>
    </>
  );
};

export default ModalEdit;