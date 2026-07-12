import React, { useState } from "react";
import CustomerFooter from "../../components/CustomerFooter";
import CustomerNavbar from "../../components/CustomerNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SMSCodeModal() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

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
          console.error("Error parsing authUser in SMSCodeModal redirect", e);
        }
      }
    }
  }, [navigate]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    const userStr = localStorage.getItem("temp_login_user");
    if (!userStr) {
      setError("Login session expired. Please start again from the phone number entry screen.");
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      
      // Perform AuthContext login
      login(user, "dev-token-xyz");

      // Set items expected by CustomerNavbar and other frontend components
      localStorage.setItem("customer_logged_in", "true");
      localStorage.setItem("customer_name", user.name);
      localStorage.setItem("customer_role", user.role);
      localStorage.setItem("customer_email", user.email);
      localStorage.setItem("customer_phone", user.phone);
      localStorage.setItem("logged_in", "true");

      // Clean up temp storage
      localStorage.removeItem("temp_login_user");
      localStorage.removeItem("temp_login_phone");

      // Redirect dynamically based on role
      if (user.role === "admin" || user.role === "super_admin") {
        navigate(`/super_admin/${user._id}/admindashboard`);
      } else if (user.role === "seller") {
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
        const slug = user.storeSlug || (user.storeName ? slugify(user.storeName) : slugify(user.name) + "-store");
        if (user.isFirstLogin) {
          navigate(`/seller/${slug}/hub`);
        } else {
          navigate(`/seller/${slug}/sellerdashboard`);
        }
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="light" lang="en">
        <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
          {/*  TopNavBar (Shared Component)  */}
          <CustomerNavbar />
          {/*  Main Content Area with Background Imagery for Context  */}
          <main className="flex-grow flex items-center justify-center relative py-xxl px-margin-mobile">
            {/*  Decorative Background Elements  */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-10 w-64 h-64 bg-secondary-container rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary-container rounded-full blur-3xl"></div>
            </div>
            {/*  Verification Modal Container  */}
            <div
              className="relative z-10 w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.08)] p-xl overflow-hidden bg-surface"
              id="modal-container"
            >
              {/*  Default Content State  */}
              <div
                className="flex flex-col items-center text-center"
                id="verification-form"
              >
                <div className="w-16 h-16 bg-secondary-fixed flex items-center justify-center rounded-full mb-lg bg-secondary/10 text-secondary">
                  <span className="material-symbols-outlined text-[32px]">
                    smartphone
                  </span>
                </div>
                <h2 className="text-h3 font-h3 text-on-surface mb-xs">
                  Enter Verification Code
                </h2>
                <p className="text-body-md text-on-surface-variant mb-xl">
                  We sent a 4-character code to your phone. Enter any 4 digits to proceed.
                </p>

                {error && (
                  <div className="text-error font-body-sm bg-error/10 p-md rounded-lg text-center mb-lg w-full">
                    {error}
                  </div>
                )}

                {/*  OTP Input Grid  */}
                <div className="flex gap-md mb-xl">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx + 1}`}
                      className="otp-input w-16 h-16 text-center text-h3 font-h3 border border-outline rounded-lg bg-surface uppercase text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface-container-low"
                      maxLength="1"
                      placeholder="·"
                      type="text"
                      value={val}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value;
                        setOtp(newOtp);
                        // Shift focus to next input
                        if (e.target.value && idx < 3) {
                          document.getElementById(`otp-${idx + 2}`).focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full text-center bg-primary text-on-primary font-label-md py-md rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all mb-lg disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>

                <div className="flex flex-col gap-xs">
                  <p
                    className="text-label-sm font-label-sm text-on-surface-variant"
                    id="timer-text"
                  >
                    Resend code in{" "}
                    <span className="font-bold text-on-surface" id="countdown">
                      60
                    </span>
                    s
                  </p>
                  <button
                    className="text-secondary font-label-md hover:underline opacity-50 cursor-not-allowed transition-all"
                    disabled
                    id="resend-link"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            </div>
          </main>
          {/*  Footer (Shared Component)  */}
          <CustomerFooter />
        </div>
      </div>
    </>
  );
}
