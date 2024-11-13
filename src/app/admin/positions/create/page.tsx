import CreatePositionForm from "@/ui/dashboard/forms/CreatePositionForm";
import Headline from "@/ui/dashboard/Typography/Headline";

export default function CreatePage() {
  console.log("test");
  return (
    <>
      <Headline variant="h1">Create Position</Headline>
      <CreatePositionForm />
    </>
  );
}
