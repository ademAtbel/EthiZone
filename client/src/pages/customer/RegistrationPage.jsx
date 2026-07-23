import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/CustomerNavbar";
import { validateEmail, validatePhone } from "../../utils/validation";
import CustomerFooter from "../../components/CustomerFooter";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import { useAuth } from "../../context/AuthContext";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  React.useEffect(() => {
    const loggedIn = localStorage.getItem("customer_logged_in") === "true" || localStorage.getItem("logged_in") === "true";
    if (loggedIn) {
      const authUserRaw = localStorage.getItem("authUser");
      if (authUserRaw) {
        try {
          const authUser = JSON.parse(authUserRaw);
          const slugify = (text) => {
            return text
              .toString()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w\-]+/g, '')
              .replace(/\-\-+/g, '-')
              .replace(/^-+/, '')
              .replace(/-+$/, '');
          };
          const slug = authUser.storeSlug || (authUser.storeName ? slugify(authUser.storeName) : slugify(authUser.name) + "-store");
          if (authUser.isFirstLogin) {
            navigate(`/seller/${slug}/hub`);
          } else {
            navigate(`/seller/${slug}/sellerdashboard`);
          }
        } catch (e) {
          console.error("Error parsing authUser in RegistrationPage redirect", e);
        }
      }
    }
  }, [navigate]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError("All fields are required");
      return;
    }

    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) {
      setError(emailCheck.reason);
      return;
    }

    const phoneCheck = validatePhone(formData.phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.reason);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the Vendor Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const payload = {
      name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: "seller"
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        data = { message: "Unable to connect to the backend server. Please make sure the backend server is running on port 5001." };
      }

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully! Redirecting to login...");
      
      localStorage.setItem("temp_login_phone", formData.phone);
      localStorage.setItem("temp_login_email", formData.email);

      setTimeout(() => {
        navigate("/phoneentrymodal");
      }, 1500);

    } catch (err) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="light" lang="en">
      <div className="text-on-surface flex flex-col min-h-screen bg-surface-container-lowest">
        <CustomerNavbar />

        <main className="flex-grow flex items-center justify-center px-margin-desktop py-xxl">
          <div className="w-full max-w-2xl bg-surface rounded-2xl shadow-xl overflow-hidden border border-outline-variant flex flex-col">
            {/* Header Area */}
            <div className="bg-primary px-xl py-lg text-center relative overflow-hidden">
              <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <h1 className="text-h2 font-h2 text-on-primary relative z-10 mb-xs">
                Partner with Ethizone
              </h1>
              <p className="text-body-md font-body-md text-primary-container relative z-10">
                Join our network and start listing your products or services
              </p>
            </div>

            {/* Form Area */}
            <div className="p-xl">
              <form onSubmit={handleSubmit} className="space-y-lg">
                {error && (
                  <div className="text-error bg-error/10 p-md rounded-lg text-center font-body-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-primary bg-primary/10 p-md rounded-lg text-center font-body-sm">
                    {success}
                  </div>
                )}
                {/* Personal Information */}
                <div>
                  <h3 className="text-h4 font-h4 text-on-surface mb-md">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-md mb-md">
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-md mb-md">
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-label-md font-label-md text-on-surface mb-xs">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Security */}
                <div>
                  <h3 className="text-h4 font-h4 text-on-surface mb-md">
                    Account Security
                  </h3>
                  <div className="space-y-md">
                    <div className="grid grid-cols-2 gap-md">
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-xs">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-label-md font-label-md text-on-surface mb-xs">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Repeat your password"
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-sm pt-sm">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-body-sm font-body-sm text-on-surface-variant"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Vendor Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <div className="pt-md">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-on-primary py-md rounded-lg font-label-lg text-label-lg shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating Account..." : "Create Partner Account"}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-md py-lg">
                <div className="flex-1 h-px bg-outline-variant"></div>
                <p className="text-label-sm font-label-sm text-on-surface-variant">
                  Or
                </p>
                <div className="flex-1 h-px bg-outline-variant"></div>
              </div>

              {/* Google Auth Button */}
              <GoogleAuthButton className="mb-xl" />

              <div className="mt-xl text-center">
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  Already a partner?{" "}
                  <Link
                    to="/phoneentrymodal"
                    className="text-primary font-label-md hover:underline"
                  >
                    Log in to Partner Portal
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        <CustomerFooter />
      </div>
    </div>
  );
}
