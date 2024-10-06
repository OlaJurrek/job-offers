import AddPositionForm from "@/ui/AddPositionForm";
import FileForm from "@/ui/FileForm";
import FileForm2 from "@/ui/FileForm2";

export default function Admin() {
  return (
    <div>
      Admin Page
      <AddPositionForm />
      <hr />
      <h2>File Form </h2>
      {/* <FileForm /> */}
      <hr />
      <h2>File Form 2</h2>
      {/* <FileForm2 /> */}
    </div>
  );
}
