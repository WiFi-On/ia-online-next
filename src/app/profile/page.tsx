import InfoPartnerModule from "@/modules/InfoPartnerModule/InfoPartnerModule";
import Header from "@/components/Header/Header";
import MobileBar from "@/components/MobileBar/MobileBar";

export async function generateStaticParams() {
  return [{}];
}

function Profile() {
  return (
    <div>
      <Header active="profile" />
      <MobileBar active="profile" />
      <InfoPartnerModule></InfoPartnerModule>
    </div>
  );
}

export default Profile;
