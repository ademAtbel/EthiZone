import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  ShoppingBag, 
  Truck, 
  MessageSquare, 
  LifeBuoy, 
  ArrowLeft,
  Menu,
  X
} from "lucide-react";

export default function SellerSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { storeSlug } = useParams();
  const slug = storeSlug || user?.storeSlug || 'my-store';
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Seller Hub", icon: Store, path: `/seller/${slug}/hub` },
    { label: "Dashboard", icon: LayoutDashboard, path: `/seller/${slug}/sellerdashboard` },
    { label: "Manage Products", icon: Package, path: `/seller/${slug}/manageproducts` },
    { label: "Manage Orders", icon: ShoppingBag, path: `/seller/${slug}/manageorders` },
    { label: "Shipping Rules", icon: Truck, path: `/seller/${slug}/shippingrules` },
    { label: "Messages", icon: MessageSquare, path: `/seller/${slug}/messages` },
    { label: "Support Chat", icon: LifeBuoy, path: `/seller/${slug}/support` },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-surface text-on_surface rounded-lg border border-outline_variant"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-surface border-r border-outline_variant z-40 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between p-lg">
          <div>
            {/* Header / Brand */}
            <div className="mb-xl flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div>
                <h2 className="text-title-md font-title-md text-primary font-bold">EthiZone Seller</h2>
                <p className="text-body-xs font-body-xs text-on_surface_variant">{user?.storeName || 'Partner Portal'}</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-sm">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = window.location.pathname === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-sm px-md py-sm rounded-lg text-label-md font-label-md transition-all ${
                      isActive 
                        ? "bg-secondary_container text-on_secondary_container font-semibold" 
                        : "text-on_surface hover:bg-surface_container_high"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="space-y-sm border-t border-surface-container-high pt-lg">
            <Link 
              to={`/store/${slug}`}
              className="flex items-center gap-sm px-md py-sm text-on_surface hover:bg-surface_container_high rounded-lg text-label-md font-label-md transition-all"
            >
              <ArrowLeft size={20} />
              <span>Back to Storefront</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-sm px-md py-sm text-error hover:bg-error_container hover:text-on_error_container rounded-lg text-label-md font-label-md transition-all text-left"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
