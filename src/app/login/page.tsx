import FormLogin from "@/components/FormLogin/FormLogin";

export async function generateStaticParams() {
  return [{}];
}

function Login() {
  return (
    <div>
      <FormLogin />
    </div>
  );
}

export default Login;
