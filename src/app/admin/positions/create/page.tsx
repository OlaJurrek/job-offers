import CreatePositionForm from "@/ui/dashboard/forms/CreatePositionForm";
import Headline from "@/ui/dashboard/typography/Headline";

export default function CreatePage() {
  return (
    <>
      <Headline variant="h1">Create Position</Headline>
      <CreatePositionForm />
    </>
  );
}
