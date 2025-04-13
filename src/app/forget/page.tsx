import FormForgetPassword from '@/components/FormForgetPassword/FormForgetPassword';

export async function generateStaticParams() {
  return [{}];
}

function Forget() {
  return (
    <div>
      <FormForgetPassword />
    </div>
  );
}

export default Forget;
