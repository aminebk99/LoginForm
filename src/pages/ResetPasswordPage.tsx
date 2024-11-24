import ResetPasswordForm from "../components/ResetPasswordForm";
import logo from "../assets/logo-1.png";

function ResetPasswordPage() {
  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-2/3 p-4">
          <ResetPasswordForm />
        </div>
        <div className="hidden lg:flex h-full w-1/3 items-center justify-center bg-white shadow-sm">
          <img src={logo} alt="Company Logo" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
