import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRefundOrderById } from "../../api/refund-orders";
import { ActivityLoader } from "../ui/activityloader";
import Badge from "../ui/badge";
import { RefundOrder } from "../../types/interfaces";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<RefundOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const getDecisionColor = (decision: string) => {
    if (decision === "accept") {
      return "success";
    } else if (decision === "reject") {
      return "error";
    } else if (decision === "escalate") {
      return "warning";
    } else return "primary";
  };

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) return;
      const data = await fetchRefundOrderById(id);
      setOrder(data);
      setTimeout(() => setLoading(false), 2000); // Show loader for 2 seconds
    };

    loadOrder();
  }, [id]);

  if (loading) return <ActivityLoader />;

  return (
    <div className="lg:max-w-3xl w-[90%] mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg dark:border-2 dark:border-gray-600 dark:ring-1 dark:ring-gray-500 rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Refund Order #{order?.id}
      </h1>

      <div className="flex gap-4 items-center mb-6">
        <img
          src={order?.store_logo}
          alt={order?.store_name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {order?.store_name}
          </h2>
          <a
            href={order?.store_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Visit Store
          </a>
        </div>
      </div>

      <p className="mb-2 flex gap-2 text-gray-800 dark:text-gray-200">
        <strong>Reason:</strong> {order?.reason}
      </p>
      <p className="mb-2 flex gap-2 text-gray-800 dark:text-gray-200">
        <strong>Amount:</strong> ${order?.amount.toFixed(2)}
      </p>
      <p className="mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-200">
        <strong>Status:</strong>
        <Badge size="md" color={order?.active ? "success" : "error"}>
          {order?.active ? "Active" : "Inactive"}
        </Badge>
      </p>

      <p className="mb-6 flex gap-2 text-gray-800 dark:text-gray-200">
        <strong>Decision:</strong>
        <Badge size="md" color={getDecisionColor(order?.decision || "Not Yet")}>
          {order?.decision
            ? order?.decision.charAt(0).toUpperCase() + order.decision.slice(1)
            : "Not Yet"}
        </Badge>
      </p>

      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Items in Refund ({order?.items.length})
      </h3>
      <div className="border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800">
        {order?.items.length ? (
          order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between py-3 border-b border-gray-300 dark:border-gray-700 last:border-b-0 text-gray-800 dark:text-gray-200"
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-800 dark:text-gray-200">
            No items in this refund.
          </p>
        )}
      </div>
    </div>
  );
}
