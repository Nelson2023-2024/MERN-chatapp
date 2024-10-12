import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import e from "cors";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search) return;

    if (search.length < 3)
      return toast.error("Search term must be at least 3 chars long");

    const conversation = conversations.find((conversation) =>
      conversation.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No search user");
    }
  };
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        value={search}
        type="text"
        placeholder="Search…"
        className="rounded-full input input-bordered"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="text-white btn btn-circle bg-sky-500">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
