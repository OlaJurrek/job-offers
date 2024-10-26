import Headline from "@/ui/dashboard/typography/Headline";
import PositionList from "@/ui/dashboard/positions/PositionList";
import InnerNav from "@/ui/dashboard/navigation/InnerNav/InnerNav";

export default function PositionsPage() {
  return (
    <>
      <Headline variant="h1">Positions</Headline>
      <InnerNav
        searchPlaceholder="Search positions..."
        linkName="Create Position"
        href="/admin/positions/create"
      />
      <PositionList />
    </>
  );
}
