import LeadsModule from "@/modules/LeadsModule/LeadsModule";
import Header from "@/components/Header/Header";
import MobileBar from "@/components/MobileBar/MobileBar";

export async function generateStaticParams() {
  return [{}];
}

function Leads() {
  return (
    <div>
      <Header active="leads" />
      <MobileBar active="leads" />
      <LeadsModule />
    </div>
  );
}

export default Leads;
