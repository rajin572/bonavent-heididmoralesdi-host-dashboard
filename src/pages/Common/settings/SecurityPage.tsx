import ChangePassword from "../../../Components/Dashboard/Profile/ChangePassword";
import DeleteAccount from "./DeleteAccount";

const SecurityPage = () => {
  return (
    <div className="p-5 flex flex-col gap-10">
      <ChangePassword />
      <div>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default SecurityPage;
