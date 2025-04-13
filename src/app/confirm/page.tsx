import FormConfirmation from '@/components/FormConfirmation/FormConfirmation';

export async function generateStaticParams() {
  return [{}];
}

function Confirm() {
  return (
    <div>
      <FormConfirmation />
    </div>
  );
}

export default Confirm;
