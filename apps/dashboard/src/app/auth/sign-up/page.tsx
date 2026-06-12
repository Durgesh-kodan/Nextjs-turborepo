import { SignUpForm } from "@/features/auth/components/sign-up-form";


export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
