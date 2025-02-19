import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge";
import { fetchRefundOrders, updateRefundOrder } from "../../api/refund-orders";
import { Dropdown, DropdownItem } from "../ui/dropdown";
import { Modal } from "../ui/modal";
import { ToggleSwitch } from "../ui/toggle";
import { Pencil } from "lucide-react";
import Pagination from "../ui/pagination";
import { useNavigate } from "react-router-dom";
import { RefundOrder } from "../../types/interfaces";

const ROWS_PER_PAGE = 15;

export default function RefundOrdersTable() {
  const [refundOrders, setRefundOrders] = useState<RefundOrder[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    message: string;
    action: (() => void) | null;
  }>({ isOpen: false, message: "", action: null });

  // Get appropriate color for decision badge
  const getDecisionColor = (decision: string) => {
    if (decision === "accept") return "success";
    if (decision === "reject") return "error";
    if (decision === "escalate") return "warning";
    return "primary";
  };

  // Fetch refund orders from API when the component mounts
  useEffect(() => {
    async function loadOrders() {
      const data = await fetchRefundOrders();
      setRefundOrders(data);
    }
    loadOrders();
  }, []);

  // Calculate pagination details
  const totalPages = Math.ceil(refundOrders.length / ROWS_PER_PAGE);
  const paginatedOrders = refundOrders.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Handle confirmation modal actions
  const handleConfirm = () => {
    if (confirmModal.action) confirmModal.action();
    setConfirmModal({ isOpen: false, message: "", action: null });
  };

  const handleCancel = () => {
    setConfirmModal({ isOpen: false, message: "", action: null });
  };

  // Handle decision change for a refund order
  const handleDecisionChange = (id: string, decision: string) => {
    setConfirmModal({
      isOpen: true,
      message: `Are you sure you want to change the decision to "${decision}"?`,
      action: async () => {
        try {
          await updateRefundOrder(id, { decision });
          setRefundOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === id ? { ...order, decision } : order
            )
          );
          toast.success(`Decision changed to "${decision}" successfully!`);
        } catch (error) {
          toast.error("Failed to update decision. Please try again.");
        }
        setOpenDropdownId(null);
      },
    });
  };

  // Handle activation/deactivation of a refund order
  const handleToggleActive = (id: string, isActive: boolean) => {
    setConfirmModal({
      isOpen: true,
      message: `Are you sure you want to ${
        isActive ? "deactivate" : "activate"
      } this refund order?`,
      action: async () => {
        try {
          await updateRefundOrder(id, { active: !isActive });
          setRefundOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === id ? { ...order, active: !order.active } : order
            )
          );
          toast.success(
            `Order ${isActive ? "deactivated" : "activated"} successfully!`
          );
        } catch (error) {
          toast.error("Failed to update order status. Please try again.");
        }
      },
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="relative max-w-full overflow-x-auto">
          <div className="min-w-[1102px] text-center">
            {/* Table component */}
            <Table>
              {/* Header of table */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow className="min-h-10 dark:text-white">
                  <TableCell isHeader>ID</TableCell>
                  <TableCell isHeader>Store</TableCell>
                  <TableCell isHeader>Reason</TableCell>
                  <TableCell isHeader>Amount</TableCell>
                  <TableCell isHeader>Decision</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader>Items</TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody>
                {paginatedOrders.map((order) => (
                  // Table row
                  <TableRow key={order.id}>
                    {/* Order ID */}
                    <TableCell className="px-4 py-3 text-gray-500">
                      {order.id}
                    </TableCell>

                    {/* Store info */}
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center justify-baseline gap-3">
                        {/* Store logo */}
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img src={order.store_logo} alt={order.store_name} />
                        </div>

                        {/* Store name trigger to the link of store */}
                        <a
                          href={order.store_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-gray-800 hover:text-purple-400 border-t-2 border-b-2 dark:text-gray-200 no-underline border-none
"
                        >
                          {order.store_name}
                        </a>
                      </div>
                    </TableCell>

                    {/* Refund reason */}
                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-200">
                      {order.reason}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-200">
                      ${order.amount.toFixed(2)}
                    </TableCell>

                    {/* Decision for the refund action */}
                    <TableCell className="px-4 py-3 relative min-h-16 ">
                      <Badge
                        size="md"
                        endIcon={
                          <button
                            onClick={() => {
                              setOpenDropdownId((prevId) =>
                                prevId === order.id ? null : order.id
                              );
                            }}
                            className="text-gray-500 hover:text-gray-900 transition-transform duration-300"
                          >
                            <Pencil
                              size={11}
                              className={`font-bold transform transition-transform duration-300 ${
                                openDropdownId === order.id ? "-rotate-90" : ""
                              }`}
                            />
                          </button>
                        }
                        color={getDecisionColor(order.decision || "Not Yet")}
                      >
                        {order.decision
                          ? order.decision.charAt(0).toUpperCase() +
                            order.decision.slice(1)
                          : "Not Yet"}
                      </Badge>

                      {/* List to change the decision from */}
                      {openDropdownId === order.id && (
                        <Dropdown isOpen>
                          {["accept", "reject", "escalate"]
                            .filter((option) => option !== order.decision)
                            .map((option) => (
                              <DropdownItem
                                key={option}
                                onClick={() =>
                                  handleDecisionChange(order.id, option)
                                }
                              >
                                {option.charAt(0).toUpperCase() +
                                  option.slice(1)}
                              </DropdownItem>
                            ))}
                        </Dropdown>
                      )}
                    </TableCell>

                    {/* Status of refund process */}
                    {/* Toggle for changing the status */}
                    <TableCell className="px-4 py-3 min-h-16r">
                      <ToggleSwitch
                        active={order.active}
                        onToggle={() =>
                          handleToggleActive(order.id, order.active)
                        }
                      />
                    </TableCell>

                    {/* Number of items in refund order */}
                    <TableCell className=" text-gray-500 dark:text-gray-200">
                      <span className="bg-gray-100 rounded-full px-2.5 py-1 dark:bg-gray-900">
                        {order.items.length || "0"}
                      </span>
                    </TableCell>

                    {/* Button to see the details of refund order */}
                    <TableCell className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          console.log(order.id);
                          navigate(`/refunds/${order.id}`);
                        }}
                        className="px-3 py-2 bg-purple-100 text-gray-600 rounded-md hover:bg-purple-600 hover:text-white transition"
                      >
                        Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Confirmation Modal for any update action */}
            <Modal isOpen={confirmModal.isOpen} onClose={handleCancel}>
              <div className="p-6 text-center flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Confirm Action
                </h3>
                <h2 className="text-xl max-w-80 text-gray-600 dark:text-gray-400">
                  {confirmModal.message}
                </h2>
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      {/* Pagination max 15 order/page */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Toast to confirm the action */}
      <ToastContainer
        className="!z-[999999] mr-5"
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </>
  );
}
