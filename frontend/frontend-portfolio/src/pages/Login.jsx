import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gabisou-primary p-8">
      <h1 className="text-2xl text-white mb-4">🔐 Login Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <SignIn
          path="/login"
          routing="path"
          afterSignInUrl="/editor" // ✅ after login, go to /editor
        />
      </div>
    </div>
  );
};

export default Login;
