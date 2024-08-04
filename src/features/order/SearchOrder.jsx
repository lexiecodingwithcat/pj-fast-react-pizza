import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    //if there is no query just return
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order#"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="transition-all w-28 rounded-full bg-yellow-100 px-4 py-2 text-xs duration-300 placeholder:text-stone-400 sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:text-sm"
      />
    </form>
  );
}

export default SearchOrder;
