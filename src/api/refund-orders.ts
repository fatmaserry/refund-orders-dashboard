import { RefundOrder } from "../types/interfaces";

const API_URL = "https://api.jsonbin.io/v3/b/6888cc6eae596e708fbd9f8c";
const API_KEY = "$2a$10$Av.g1YCFbmq/Ibc30DikOOXKUvockbCP4Fv94YVeN1WnlBqvnlVA6";

// Fetch all refund orders
export const fetchRefundOrders = async (): Promise<RefundOrder[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch orders");

    const data = await response.json();
    return data.record.refunds || [];
  } catch (error) {
    console.error("Error fetching refund orders:", error);
    return [];
  }
};

// Fetch a single refund order by ID
export const fetchRefundOrderById = async (
  id: string
): Promise<RefundOrder | null> => {
  try {
    const orders = await fetchRefundOrders();
    return orders.find((order) => order.id === id) || null;
  } catch (error) {
    console.error(`Error fetching refund order with ID ${id}:`, error);
    return null;
  }
};

// Add a new refund order
export const addRefundOrder = async (
  newOrder: RefundOrder
): Promise<RefundOrder | null> => {
  try {
    const orders = await fetchRefundOrders();
    const updatedOrders = [...orders, newOrder];

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refunds: updatedOrders }),
    });

    if (!response.ok) throw new Error("Failed to add order");
    return newOrder;
  } catch (error) {
    console.error("Error adding refund order:", error);
    return null;
  }
};

// Update a refund order
export const updateRefundOrder = async (
  id: string,
  updatedOrder: Partial<RefundOrder>
): Promise<RefundOrder | null> => {
  try {
    const orders = await fetchRefundOrders();
    const index = orders.findIndex((order) => order.id === id);
    if (index === -1) return null;

    orders[index] = { ...orders[index], ...updatedOrder };

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refunds: orders }),
    });

    if (!response.ok) throw new Error("Failed to update order");
    return orders[index];
  } catch (error) {
    console.error("Error updating refund order:", error);
    return null;
  }
};

// Delete a refund order
export const deleteRefundOrder = async (id: string): Promise<boolean> => {
  try {
    const orders = await fetchRefundOrders();
    const updatedOrders = orders.filter((order) => order.id !== id);

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refunds: updatedOrders }),
    });

    if (!response.ok) throw new Error("Failed to delete order");
    return true;
  } catch (error) {
    console.error("Error deleting refund order:", error);
    return false;
  }
};
