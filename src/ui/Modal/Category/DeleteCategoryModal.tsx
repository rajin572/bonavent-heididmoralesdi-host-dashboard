/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";

interface DeleteCategoryModalProps<T> {
  isDeleteModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleDelete: (data: T) => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps<any>> = ({
  isDeleteModalVisible,
  handleCancel,
  currentRecord,
  handleDelete,
}) => {
  console.log(currentRecord);
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalVisible}
      onOk={handleDelete}
      onCancel={handleCancel}
      okText="delete"
      cancelText="Cancel"
      // styles.body={{ textAlign: "center" }}
      footer={false}
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
        Are You Sure You want to Delete This?
      </p>
      <p className="text-2xl font-semibold pb-4 text-base-color">
        Please Enter Your Password
      </p>
      <ReusableForm handleFinish={handleDelete}>
        <ReuseInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          rules={[{ required: true, message: "Password is required" }]}
        />

        <ReuseButton
          htmlType="submit"
          variant="error"
          className="!w-full flex items-center justify-center gap-2 "
        >
          Delete
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default DeleteCategoryModal;
