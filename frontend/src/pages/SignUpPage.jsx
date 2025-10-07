import React, { useState } from "react";
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

const SignUpPage = () => {
  const [showPassword, setPassword] = useState(false); // for show password button
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateForm();
    if (result == true) {
      signup(formData);
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
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
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get connected to Tether!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="input validator">
              <User className="size-5 text-base-content/40" />
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </label>
          </div>

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
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <LoaderCircle className=" size-5 animate-spin" /> Siging up...
              </>
            ) : (
              <>Create Account</>
            )}
          </button>
        </form>

        <div className="text-center m-4">
          <p className="text-base-content/60">
            {" "}
            Already have an account?{" "}
            <Link to={"/login"} className="link link-primary">
              Sign in!
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

export default SignUpPage;
