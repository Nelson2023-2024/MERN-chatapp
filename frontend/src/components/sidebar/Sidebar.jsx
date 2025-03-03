import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="flex flex-col p-4 border-r border-slate-500">
      <SearchInput />
      <div className="px-5 divider" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
