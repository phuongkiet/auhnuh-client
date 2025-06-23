import { UserAdminDTO, UserStatus} from "../../../../app/models/user.model";
import { observer } from "mobx-react-lite";
import { getRoleLabel, getStatusLabel } from "../../../../app/common/stringUtils";

interface UserDetails {
  user: UserAdminDTO;
}

// const { isOpen, onClose } = useModal();

const viewModal = ({user}: UserDetails) => {

  const Detail = ({ label, value }: { label: string; value: any }) => (
    <div className="flex justify-between border-b py-3">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className= "items-center justify-center overflow-y-auto modal z-99999 mt-5">
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">User Details</h2>

        <div className="space-y-3 text-sm text-gray-700">
          <Detail label="ID" value={user.id} />
          <Detail label="Name" value={user.name} />
          <Detail label="Phone Number" value={user.phoneNumber} />
          <Detail label="Email" value={user.email} />
          <Detail label="Birthday" value={new Date(user.birthday).toLocaleDateString("en-GB")} />
          <Detail label="Created At" value={`Joined ${new Date(user.createdAt).getFullYear()}`} />
          <Detail label="Updated At" value={new Date(user.updatedAt).toLocaleString("en-GB")} />
          <Detail label="Role" value={getRoleLabel(user.roleId)} />
          <div className="flex justify-between py-3">
            <span className="font-semibold text-gray-600">Status:</span>
            <span className={`text-gray-800 rounded-lg p-2 ${
                        user.status === UserStatus.Active
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"}`}
            >
              {getStatusLabel(user.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )


}

export default observer(viewModal);
