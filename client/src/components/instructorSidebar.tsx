import React, { useState } from "react";
import { Home, LogOut, X, AlignJustify } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/auth/login")
  };

  const links = [
    { name: "Dashboard", icon: <Home className="w-6 h-6" />, href: "/instructor" },
  ];

  return (
    <div className="flex">

      <div
        className={cn(
          "bg-gray-800 text-white h-screen p-4 flex flex-col items-center",
          isMinimized ? "w-20" : "w-64",
          "transition-width duration-300"
        )}
      >
        <button
          onClick={toggleSidebar}
          className="mb-4 p-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          {isMinimized ? <AlignJustify /> : <X />}
        </button>

        <nav className="flex flex-col my-10 space-y-4 w-full">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 w-full",
                isMinimized ? "justify-center" : "justify-start"
              )}
            >
              {link.icon}
              {!isMinimized && <span>{link.name}</span>}
            </a>
          ))}

          <Button
            onClick={handleLogout}
            className={cn(
              "flex items-center space-x-2 p-2 bg-transparent rounded-md hover:bg-gray-700 w-full",
              isMinimized ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className="w-6 h-6" />
            {!isMinimized && <span>Logout</span>}
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
