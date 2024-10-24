import Headline from "@/ui/dashboard/typography/Headline";
import Paper from "@/ui/dashboard/surfaces/Paper";
import PositionList from "@/ui/dashboard/positions/PositionList";

export default function PositionsPage() {
  return (
    <>
      <Headline variant="h1">Positions</Headline>
      <Paper css={{ padding: "0 .5rem 1rem" }}>
        <PositionList />
      </Paper>
    </>
  );
}
