import { RefundOrder } from "../types/interfaces";

const API_URL = "http://localhost:5001/refunds";

// Fetch all refund orders
export const fetchRefundOrders = async (): Promise<RefundOrder[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
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
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch order");
    return await response.json();
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
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) throw new Error("Failed to add order");
    return await response.json();
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
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) throw new Error("Failed to update order");
    return await response.json();
  } catch (error) {
    console.error("Error updating refund order:", error);
    return null;
  }
};

// Delete a refund order
export const deleteRefundOrder = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) throw new Error("Failed to delete order");
    return true;
  } catch (error) {
    console.error("Error deleting refund order:", error);
    return false;
  }
};
