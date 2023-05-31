import { Modal, ModalProps, Tag, Typography } from "antd";
import { FC } from "react";
import { Todo } from "../../utils/interfaces/todo.interface";
import { InfoCircleOutlined } from "@ant-design/icons";

interface IDeleteModal extends ModalProps {
  currentSelectedTodo: Todo | undefined;
}

const DeleteModal: FC<IDeleteModal> = ({
  open,
  onOk,
  onCancel,
  currentSelectedTodo,
  ...props
}) => {
  const data = [
    {
      title: "Delete current todo",
    },
    {
      title: "Delete children todo's",
    },
    {
      title: "Make sure you are deleting the right one",
    },
    {
      title: "Once deleted it never be restored",
    },
  ];

  return (
    <Modal
      title={
        <Typography.Text>
          Are you sure want to delete{" "}
          <Typography.Text strong>{currentSelectedTodo?.name}</Typography.Text>{" "}
          ?
        </Typography.Text>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
      okButtonProps={{
        style: {
          backgroundColor: "#5468FF",
          borderRadius: 6,
        },
      }}
    >
      <div className="mt-8 mb-4">
        <Tag
          bordered={false}
          color="warning"
          className="flex"
          icon={<InfoCircleOutlined />}
        >
          <Typography.Text strong className="">
            Keep in mind while deleting
          </Typography.Text>
        </Tag>
      </div>

      <div className="flex flex-col gap-4 mt-2 mb-8">
        {data.map((item) => (
          <Tag
            bordered={false}
            color="error"
            className="flex gap-4"
            icon={<InfoCircleOutlined />}
          >
            <Typography.Text>{item.title}</Typography.Text>
          </Tag>
        ))}
      </div>
    </Modal>
  );
};

export default DeleteModal;
