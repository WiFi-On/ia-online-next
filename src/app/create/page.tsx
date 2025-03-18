import FormAddLead from "@/components/FormAddLead/FormAddLead";
import Header from "@/components/Header/Header";
import MobileBar from "@/components/MobileBar/MobileBar";

export async function generateStaticParams() {
  return [{}];
}

function Create() {
  return (
    <div>
      <Header active="create" />
      <MobileBar active="create" />
      <FormAddLead />
    </div>
  );
}

export default Create;
