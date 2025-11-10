import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { Card } from "@/app/ui/dashboard/cards";
import { Suspense } from "react";
import Loading from "@/app/dashboard/loading";
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";

export default async function DashboardPage() {
  // react server component. Can also be async and fetch data here
  // This will only work for server components
  // const res = await fetch("/api/dashboard");
  // const json = await res.json();
  // console.log(json);

  // console.log(revenue); // Will log the revenue data fetched from the database but only on the server sid

  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected"/>
        <Card title="Pending" value={totalPendingInvoices} type="pending"/>
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices"/>
        {<Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton/>}>
          {/* The suspense will load the fallback component meanwhile  */}
          <RevenueChart/>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
          <LatestInvoices/>
        </Suspense>
      </div>
    </main>
  );
}
