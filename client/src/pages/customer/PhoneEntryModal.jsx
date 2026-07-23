import React, { useState, useEffect } from "react";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import { useAuth } from "../../context/AuthContext";

export default function PhoneEntryModal() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("phone"); // "phone" | "email"
  const [countryCode, setCountryCode] = useState("+251");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
          console.error("Error parsing authUser in PhoneEntryModal redirect", e);
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    const savedPhone = localStorage.getItem("temp_login_phone");
    const savedEmail = localStorage.getItem("temp_login_email");
    if (savedPhone) {
      if (savedPhone.startsWith("+251")) {
        setCountryCode("+251");
        setPhoneNumber(savedPhone.replace("+251", ""));
      } else if (savedPhone.startsWith("+1")) {
        setCountryCode("+1");
        setPhoneNumber(savedPhone.replace("+1", ""));
      } else if (savedPhone.startsWith("+44")) {
        setCountryCode("+44");
        setPhoneNumber(savedPhone.replace("+44", ""));
      } else {
        setPhoneNumber(savedPhone);
      }
    }
    if (savedEmail) {
      setEmail(savedEmail);
      setActiveTab("email");
    }
  }, []);

  const handleEmailLogin = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        data = { message: "Unable to connect to the backend server. Please make sure the backend server is running on port 5001." };
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const user = data.user;
      const loggedInUser = {
        ...user,
        id: user._id || user.id
      };

      // Perform AuthContext login
      login(loggedInUser, data.token || "dev-token-xyz");

      // Set items expected by CustomerNavbar and other frontend components
      localStorage.setItem("customer_logged_in", "true");
      localStorage.setItem("customer_name", loggedInUser.name);
      localStorage.setItem("customer_role", loggedInUser.role);
      localStorage.setItem("customer_email", loggedInUser.email);
      localStorage.setItem("customer_phone", loggedInUser.phone);
      localStorage.setItem("logged_in", "true");

      // Clean up temporary registration items
      localStorage.removeItem("temp_login_phone");
      localStorage.removeItem("temp_login_email");

      // Redirect dynamically based on role
      if (loggedInUser.role === "admin" || loggedInUser.role === "super_admin") {
        navigate(`/super_admin/${loggedInUser.id}/admindashboard`);
      } else if (loggedInUser.role === "seller") {
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
        const slug = loggedInUser.storeSlug || (loggedInUser.storeName ? slugify(loggedInUser.storeName) : slugify(loggedInUser.name) + "-store");
        if (loggedInUser.isFirstLogin) {
          navigate(`/seller/${slug}/hub`);
        } else {
          navigate(`/seller/${slug}/sellerdashboard`);
        }
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    let fullPhone = phoneNumber.trim();
    if (!fullPhone) {
      setError("Please enter a phone number.");
      setLoading(false);
      return;
    }

    // Standardize phone number formatting
    if (!fullPhone.startsWith("+")) {
      const cleanedNum = fullPhone.startsWith("0")
        ? fullPhone.substring(1)
        : fullPhone;
      fullPhone = countryCode + cleanedNum;
    }

    try {
      const response = await fetch("/api/auth/login-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        data = { message: "Unable to connect to the backend server. Please make sure the backend server is running on port 5001." };
      }

      if (!response.ok) {
        throw new Error(data.message || "User lookup failed");
      }

      localStorage.setItem("temp_login_phone", fullPhone);
      localStorage.setItem("temp_login_user", JSON.stringify(data.user));
      navigate("/smscodemodal");
    } catch (err) {
      console.warn(
        "Backend phone lookup error, using mock fallback:",
        err.message,
      );

      // Local development fallback
      const mockUsers = [
        {
          id: "user-001",
          _id: "user-001",
          name: "Abbebe Kebede",
          email: "abbebe@ethizone.com",
          phone: "+251911888888",
          role: "customer",
        },
        {
          id: "user-002",
          _id: "user-002",
          name: "Chala Abebe",
          email: "chala@ethizone.com",
          phone: "+251911654321",
          role: "seller",
          storeName: "Addis Boutique",
          storeSlug: "addis-boutique",
        },
        {
          id: "user-003",
          _id: "user-003",
          name: "Selamawit Kebede",
          email: "selam@ethizone.com",
          phone: "+251911987654",
          role: "seller",
          storeName: "Ayat Furniture",
          storeSlug: "ayat-furniture",
        },
        {
          id: "admin-001",
          _id: "admin-001",
          name: "Super Admin",
          email: "admin@ethizone.com",
          phone: "+251900000000",
          role: "super_admin",
        },
      ];

      const user = mockUsers.find((u) => u.phone === fullPhone);
      if (user) {
        localStorage.setItem("temp_login_phone", fullPhone);
        localStorage.setItem("temp_login_user", JSON.stringify(user));
        navigate("/smscodemodal");
      } else {
        setError("Account not found. Please try another phone number.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-surface font-body-md overflow-hidden">
          {/*  Mock Background Page (Product Details)  */}
          <div className="fixed inset-0 z-0 overflow-y-auto">
            {/*  Shared TopNavBar  */}
            <CustomerNavbar />
            {/*  Product Hero Section Mock  */}
            <main className="max-w-[1440px] mx-auto px-margin-desktop py-xxl grid grid-cols-1 lg:grid-cols-2 gap-xxl opacity-50 pointer-events-none">
              <div className="rounded-xl overflow-hidden bg-surface-container aspect-square relative">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A premium, sleek minimalist white wristwatch placed on a marble surface. The lighting is bright and ethereal, casting soft shadows. The overall aesthetic is professional, clean, and high-end, mirroring a modern luxury retail experience with pristine white backgrounds and subtle gray textures."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy6FSOZb8wpgCj-SL43vF1eVeXNBLXk2kNtwIdMDWjM1HuKE4OMFd_8i4s9wsHn8gKEf77IDgWzJbaHuqxYeYjksLJk8fRaAmv4R9IdiBI3dAmIqCeun60Qw2FJ6TYOmHl8eZaETHg_vSEPKwEoP2AvvcxVcxPj1Ym5LMGd67OYBokGdtu9TTcWN-iDwWFlfimjEe4zixkSgsjtR5pqKL5msBoPJDRJQodg-Jhf_0zfrelI6YxXcrIK5f3vegrc-A6S1RVtRkqWTpm"
                />
              </div>
              <div className="flex flex-col gap-lg">
                <div className="flex flex-col gap-sm">
                  <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider">
                    Premium Essentials
                  </span>
                  <h1 className="text-h1 font-h1 text-on-surface">
                    Minimalist Ivory Watch
                  </h1>
                  <div className="flex items-center gap-sm">
                    <div className="flex text-[#FFB800]">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px]">
                        star_half
                      </span>
                    </div>
                    <span className="text-body-sm font-body-sm text-on-surface-variant">
                      (124 Reviews)
                    </span>
                  </div>
                </div>
                <h2 className="text-h2 font-h2 text-primary">$299.00</h2>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  A timeless piece designed for the modern professional. Crafted
                  with surgical-grade stainless steel and an Italian leather
                  strap.
                </p>
                <div className="flex flex-col gap-md pt-md border-t border-outline-variant">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Close-up portrait of a professional male store owner with a warm, trustworthy expression. He is wearing a clean, modern white linen shirt. The background is a blurred artisan workshop with high-key natural lighting, maintaining the brand's professional and approachable identity."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlgCY-7IdOso7N10h2EjcM81GHhl2AK8S6XR1N_lfYOQ2sdfBU5o2qLOOjUE0lvRvMFEC4fLQkeOccdh0OJPbj7-fHXfVIiT7FTs0PtQ2svKHL3OSpFCWiweA7hBclmcLDGC7IRV48rWJPzgfqruNG_pjBMuJt4uXLu2nkJtPipJuYNh1DaKZ2HsG16BTDZ1QN9Cef3PjLfP6LeZ0oUgXEmIwvuDdE9MSqnx2ebqofABeS021DZ5_6g7rNN67xIYKsLVYTNLiNJLbZ"
                      />
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">
                        Artisan Watches Co.
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Top Rated Seller
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-md rounded-lg flex items-center justify-center gap-sm">
                    <span className="material-symbols-outlined">chat</span>
                    Chat with Seller
                  </button>
                </div>
              </div>
            </main>
          </div>
          {/*  Modal Overlay  */}
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-margin-mobile modal-overlay"
            id="verificationModal"
          >
            {/*  Modal Container  */}
            <div className="glass-card w-full max-w-[440px] rounded-xl overflow-hidden animate-in fade-in zoom-in duration-300 bg-surface shadow-2xl border border-outline-variant">
              {/*  Modal Header  */}
              <div className="px-xl pt-xl pb-md flex justify-between items-start">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ fontVariationSettings: "'wght' 600" }}
                  >
                    phonelink_setup
                  </span>
                </div>
                <Link
                  to="/"
                  className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-xs rounded-full transition-colors"
                >
                  close
                </Link>
              </div>
              {/*  Modal Content  */}
              <div className="px-xl pb-xl flex flex-col gap-lg">
                <div className="flex flex-col gap-xs">
                  <h3 className="text-h3 font-h3 text-on-surface">
                    Partner & Customer Login
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    {activeTab === "phone" ? "Enter your phone number to sign in." : "Enter your email and password to sign in."}
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-outline-variant">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("phone");
                      setError("");
                    }}
                    className={`flex-1 pb-sm font-label-md text-center border-b-2 transition-all cursor-pointer ${
                      activeTab === "phone"
                        ? "border-primary text-primary font-bold"
                        : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Phone Number
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("email");
                      setError("");
                    }}
                    className={`flex-1 pb-sm font-label-md text-center border-b-2 transition-all cursor-pointer ${
                      activeTab === "email"
                        ? "border-primary text-primary font-bold"
                        : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Email Address
                  </button>
                </div>

                {activeTab === "phone" ? (
                  <form
                    onSubmit={handleSendCode}
                    className="flex flex-col gap-lg"
                  >
                    {/*  Input Group  */}
                    <div className="flex flex-col gap-sm">
                      <label className="text-label-sm font-label-sm text-on-surface-variant ml-1">
                        Phone Number
                      </label>
                      <div className="flex gap-sm">
                        {/*  Country Code  */}
                        <div className="relative min-w-[100px]">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-full h-[52px] pl-md pr-xl bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface appearance-none focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all cursor-pointer"
                          >
                            <option value="+251">+251 ET</option>
                            <option value="+1">+1 US</option>
                            <option value="+44">+44 UK</option>
                            <option value="+49">+49 DE</option>
                            <option value="+33">+33 FR</option>
                            <option value="+91">+91 IN</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                            expand_more
                          </span>
                        </div>
                        {/*  Number Input  */}
                        <input
                          className="flex-1 h-[52px] px-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                          placeholder="912345678"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="text-error font-body-sm bg-error/10 p-md rounded-lg text-center">
                        {error}
                      </div>
                    )}

                    {/* Dev Quick Select (Mock Users) */}
                    <div className="flex flex-col gap-xs border border-dashed border-outline-variant p-md rounded-lg bg-surface-container-low">
                      <p className="text-label-sm font-semibold text-on-surface-variant text-center">
                        Dev Quick Select (Autofill & Log In)
                      </p>
                      <div className="grid grid-cols-2 gap-sm">
                        <button
                          type="button"
                          onClick={() => {
                            setCountryCode("+251");
                            setPhoneNumber("900000000");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          🔑 Admin Mock
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCountryCode("+251");
                            setPhoneNumber("911654321");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          💼 Seller Addis
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCountryCode("+251");
                            setPhoneNumber("911987654");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          💼 Seller Ayat
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCountryCode("+251");
                            setPhoneNumber("911888888");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          👤 Customer Mock
                        </button>
                      </div>
                    </div>

                    {/*  Action Button  */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Sending..." : "Send Code"}
                      <span className="material-symbols-outlined text-[20px]">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                ) : (
                  <form
                    onSubmit={handleEmailLogin}
                    className="flex flex-col gap-lg"
                  >
                    {/* Email Input */}
                    <div className="flex flex-col gap-sm">
                      <label className="text-label-sm font-label-sm text-on-surface-variant ml-1">
                        Email Address
                      </label>
                      <input
                        className="h-[52px] px-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        placeholder="name@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-sm">
                      <label className="text-label-sm font-label-sm text-on-surface-variant ml-1">
                        Password
                      </label>
                      <input
                        className="h-[52px] px-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {error && (
                      <div className="text-error font-body-sm bg-error/10 p-md rounded-lg text-center">
                        {error}
                      </div>
                    )}

                    {/* Dev Quick Select (Email Autofill) */}
                    <div className="flex flex-col gap-xs border border-dashed border-outline-variant p-md rounded-lg bg-surface-container-low">
                      <p className="text-label-sm font-semibold text-on-surface-variant text-center">
                        Dev Quick Select (Email Autofill)
                      </p>
                      <div className="grid grid-cols-2 gap-sm">
                        <button
                          type="button"
                          onClick={() => {
                            setEmail("admin@ethizone.com");
                            setPassword("password123");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          🔑 Admin Mock
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEmail("chala@ethizone.com");
                            setPassword("password123");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          💼 Seller Addis
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEmail("selam@ethizone.com");
                            setPassword("password123");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          💼 Seller Ayat
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEmail("abbebe@ethizone.com");
                            setPassword("password123");
                          }}
                          className="px-xs py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-all font-medium"
                        >
                          👤 Customer Mock
                        </button>
                      </div>
                    </div>

                    {/*  Action Button  */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Logging in..." : "Log In"}
                      <span className="material-symbols-outlined text-[20px]">
                        login
                      </span>
                    </button>
                  </form>
                )
              }

                {/* Divider */}
                <div className="flex items-center gap-md py-sm">
                  <div className="flex-1 h-px bg-outline-variant"></div>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">
                    Or
                  </p>
                  <div className="flex-1 h-px bg-outline-variant"></div>
                </div>

                {/* Google Auth Button */}
                <GoogleAuthButton className="w-full" />

                {/*  Privacy Note  */}
                <div className="flex gap-sm p-md bg-surface-container rounded-lg items-start">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    verified_user
                  </span>
                  <p className="text-label-sm font-label-sm text-on-surface-variant leading-tight">
                    We use your phone number only to verify your account
                    identity securely. We will never share your number or use it
                    for spam.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  Success Toast (Hidden by default)  */}
          <div
            className="fixed bottom-margin-desktop left-1/2 -translate-x-1/2 z-[200] opacity-0 translate-y-4 pointer-events-none transition-all duration-300"
            id="toast"
          >
            <div className="bg-inverse-surface text-inverse-on-surface px-xl py-md rounded-full flex items-center gap-md shadow-xl">
              <span className="material-symbols-outlined text-primary-fixed">
                check_circle
              </span>
              <span className="font-label-md text-label-md">
                Verification code sent successfully!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
