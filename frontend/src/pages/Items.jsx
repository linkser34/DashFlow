import DashboardLayout from "../layouts/DashboardLayout";
import { items } from "../data/items";

export const Items = () => {
  return (
    <DashboardLayout>
      <div className="text-2xl font-bold text-gray-700 mb-4">Items</div>

      {/* Placeholder for table or cards */}
      {/* <div className="bg-white p-6 rounded shadow text-gray-600">
        This is where you'll manage your inventory items. <br />
        Add, update, delete, and search items here.
      </div> */}
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded bg-white p-4 shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.category}</p>
            <p className="text-gray-600">{item.description}</p>
            <p>
              Price: ${item.price} | Stock: {item.stock}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

