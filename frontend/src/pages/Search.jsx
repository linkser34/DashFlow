import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { items } from "../data/items";

export const Searchtxt = () => {
  const [searchText, setSearchText] = useState("");

  const query = searchText.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const searchableText = `
      ${item.name}
      ${item.category}
      ${item.description}
    `.toLowerCase();

    return searchableText.includes(query);
  });

  return (
    <DashboardLayout>
      <h2 className="mb-4 text-2xl font-bold text-gray-700">
        Search Items
      </h2>

      <div className="rounded bg-white p-6 shadow">
        <input
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by name, category or description..."
          className="mb-6 w-full rounded border p-3"
        />

        {query && filteredItems.length === 0 && (
          <p className="text-red-500">No items found.</p>
        )}

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <article key={item.id} className="rounded border p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-sm text-indigo-600">{item.category}</p>

              <p className="text-gray-600">{item.description}</p>

              <p className="mt-2 text-sm">
                Price: ${item.price} | Stock: {item.stock}
              </p>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};