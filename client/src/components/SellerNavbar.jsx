import React from "react";
import { useAuth } from "../context/AuthContext";
import { Bell, User } from "lucide-react";

export default function SellerNavbar({ title }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 bg-surface border-b border-outline_variant px-gutter-mobile md:px-gutter-desktop py-md flex items-center justify-between z-30 h-16 w-full">
      {/* Title */}
      <h1 className="text-title-lg font-title-lg text-on_surface font-semibold truncate pl-12 md:pl-0">
        {title || "Seller Dashboard"}
      </h1>

      {/* Right Side Actions */}
      <div className="flex items-center gap-md">
        {/* Notifications Icon */}
        <button 
          type="button"
          onClick={() => alert("No new notifications")}
          className="p-2 text-on_surface_variant hover:bg-surface_container_high rounded-full transition-all relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
        </button>

        {/* User Account Info */}
        <div className="flex items-center gap-sm pl-md border-l border-outline_variant">
          <div className="hidden sm:block text-right">
            <p className="text-label-md font-label-md text-on_surface font-semibold truncate max-w-[120px]">
              {user?.name || "Seller User"}
            </p>
            <p className="text-body-xs font-body-xs text-on_surface_variant truncate max-w-[120px]">
              {user?.role?.toUpperCase() || "SELLER"}
            </p>
          </div>
          
          {/* Avatar Icon */}
          <div className="w-10 h-10 rounded-full bg-primary_container text-on_primary_container flex items-center justify-center font-bold">
            {user?.storeLogo ? (
              <img src={user.storeLogo} alt="Logo" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={20} className="text-primary" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
