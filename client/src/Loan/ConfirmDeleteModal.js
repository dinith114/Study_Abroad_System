import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmDeleteModal = ({ visible, onConfirm, onCancel, message }) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
