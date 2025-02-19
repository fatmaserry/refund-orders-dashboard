import React from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import RefundOrdersTable from "../components/tables/RefundOrdersTable";
import PageMeta from "../components/common/PageMeta";

export default function Tables() {
  return (
    <>
      <PageMeta
        title="Dashboard | Refund Orders"
        description="Yamm Task Dashboard"
      />
      <PageBreadcrumb pageTitle="Refund Orders" />
      <div className="space-y-6">
        <ComponentCard title="Orders">
          <RefundOrdersTable />
        </ComponentCard>
      </div>
    </>
  );
}
