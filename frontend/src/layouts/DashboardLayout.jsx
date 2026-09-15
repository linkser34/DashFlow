import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { items } from "../data/items";

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text, query) => {
  if (!query) return text;

  return text.split(new RegExp(`(${escapeRegex(query)})`, "gi")).map(
    (part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
  );
};

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");

  const query = searchText.trim().toLowerCase();

  const results = items.filter((item) => {
    const searchableText = `
      ${item.name}
      ${item.category}
      ${item.description}
    `.toLowerCase();

    return query && searchableText.includes(query);
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 min-h-screen w-full bg-gray-50">
        <div className="border-b bg-white p-6 shadow">
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search items..."
                className="w-80 rounded border px-3 py-2"
              />

              {query && (
                <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-80 overflow-y-auto rounded border bg-white shadow-lg">
                  {results.length === 0 ? (
                    <p className="p-4 text-red-500">No items found.</p>
                  ) : (
                    results.map((item) => (
                      <div
                        key={item.id}
                        className="border-b p-3 last:border-b-0 hover:bg-gray-50"
                      >
                        <h3 className="font-semibold text-gray-800">
                          {highlightText(item.name, searchText.trim())}
                        </h3>

                        <p className="text-sm text-indigo-600">
                          {highlightText(item.category, searchText.trim())}
                        </p>

                        <p className="text-sm text-gray-600">
                          {highlightText(item.description, searchText.trim())}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {user && (
              <span className="ml-auto text-sm font-medium text-gray-600">
                Welcome,{" "}
                <span className="text-indigo-600">{user.name}</span>
              </span>
            )}
          </div>
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;