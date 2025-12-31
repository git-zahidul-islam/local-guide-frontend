import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/auth/auth.service";
import Link from "next/link";
import { MapPin } from "lucide-react";
import LoginForm from "@/components/modules/Auth/LoginForm";

export const metadata = {
  title: "Login | LocalGuide",
  description:
    "Sign in to your LocalGuide account to book tours or manage your guide listings.",
};

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirect || "/";

  // Check if user is already logged in (server-side)
  const currentUser = await getCurrentUser();

  if (currentUser) {
    if (redirectTo !== "/") {
      redirect(redirectTo);
    } else {
      const userRole = currentUser.role;
      if (userRole === "GUIDE") {
        redirect("/dashboard/guide");
      } else if (userRole === "ADMIN") {
        redirect("/dashboard/admin");
      } else {
        redirect("/dashboard/tourist");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href={"/"}
            className="flex items-center justify-center space-x-2 mb-4 group"
          >
            <div className="p-2 bg-gradient-to-br from-secondary to-accent rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">LocalGuide</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-300">Sign in to continue your adventure</p>
        </div>

        {/* Login Form - Client Component */}
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
