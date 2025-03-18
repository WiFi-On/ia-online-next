import FormRegistration from "@/components/FormRegistration/FormRegistration";

export async function generateStaticParams() {
  return [{}];
}

function Registration() {
  return (
    <div>
      <FormRegistration />
    </div>
  );
}

export default Registration;
