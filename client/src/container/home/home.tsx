import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-indigo-600 md:w-1/3 p-8 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-2">Timely</h1>
              <p className="text-indigo-200">Schedule smarter, learn better</p>
            </div>
          </div>
          <div className="p-8 md:p-12 md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Timely</h2>
            <p className="text-gray-600 mb-8">
              Revolutionize your online learning experience with Timely. 
              Effortlessly schedule and manage your lectures, connect with instructors, 
              and stay on top of your educational journey.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <FeatureCard 
                icon={<Calendar className="w-8 h-8 text-indigo-600" />}
                title="Easy Scheduling"
                description="Intuitive interface for quick and efficient lecture scheduling"
              />
              <FeatureCard 
                icon={<Clock className="w-8 h-8 text-indigo-600" />}
                title="Time Management"
                description="Track your lecture times and never miss an important session"
              />
              <FeatureCard 
                icon={<Users className="w-8 h-8 text-indigo-600" />}
                title="Collaborate"
                description="Connect with instructors and peers for a richer learning experience"
              />
            </div>
            <Button 
              onClick={handleLoginClick}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 py-3 rounded-lg text-lg font-semibold"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default HomePage;