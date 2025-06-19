import Heading from "@/components/Heading";
import SectionHeader from "@/components/SectionHeader";
import Segment from "@/components/Segment";
import { useSearchParams } from "react-router";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

const segmentItems = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("last") || "7";

  const handleSegmentChange = (value: string) => {
    setSearchParams({ last: value });
  };

  return (
    <>
      <SectionHeader>
        <Heading>Dashboard</Heading>
        <Segment
          items={segmentItems}
          value={activeFilter}
          onValueChange={handleSegmentChange}
        />
      </SectionHeader>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
