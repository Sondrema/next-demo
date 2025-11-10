import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
    // this function is used to display a loading state while the dashboard page is being loaded
    // next js will automatically show this component while the page is loading
    return <DashboardSkeleton/>;
}
