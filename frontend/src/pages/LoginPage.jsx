import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  EyeOff,
  Eye,
  LoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setPassword] = useState(false); // for show password button
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
  };
  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo  */}
          <div className="flex flex-col items-center gap-2 group mb-10">
            <div
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="input validator">
              <Mail className="size-5 text-base-content/40" />
              <input
                type="email"
                required
                placeholder="johndoe@john.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>
          </div>

          <div className="form-control">
            <label className="input validator">
              <Lock className="size-5 text-base-content/40" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="******"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button type="button" onClick={(e) => setPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <LoaderCircle className=" size-5 animate-spin" /> Siging up...
              </>
            ) : (
              <>Sign in</>
            )}
          </button>
        </form>

        <div className="text-center m-4">
          <p className="text-base-content/60">
            {" "}
            New to Tether?{" "}
            <Link to={"/signup"} className="link link-primary">
              Sign up now!
            </Link>
          </p>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join the community!"
        subtitle="Connect with friends, share moments, and stay in touch."
      />
    </div>
  );
};

export default LoginPage;
