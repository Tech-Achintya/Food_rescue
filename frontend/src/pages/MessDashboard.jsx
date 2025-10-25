import { useState } from "react";
import Status from "../components/Status";
import DeliveryForm from "../components/DeliveryForm";
import ManageFood from "../components/ManageFood";
import HamburgerMenu from "../components/HamburgerMenu";
import History from "../components/History";
import NGOContact from "../components/NGOContact";

export default function MessDashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState('dashboard');

  const handleMenuSelect = (option) => {
    setActiveView(option);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'history':
        return <History user={user} />;
      case 'manage-food':
        return <ManageFood />;
      case 'ngo-contact':
        return <NGOContact />;
      default:
        return (
          <div className="flex h-full gap-6">
            {/* Left Side - Status Bar (Large) */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-white rounded-lg shadow-lg">
                <Status />
              </div>
              
              {/* Add Food Section Below Status */}
              <div className="mt-6 bg-white rounded-lg shadow-lg">
                <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg">
                  <h2 className="text-xl font-bold">Add Food Items</h2>
                  <p className="text-green-100 text-sm">Create new food rescue packages</p>
                </div>
                <div className="p-4">
                  <DeliveryForm user={user} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-gray-800">Food Rescue Dashboard</div>
            <div className="text-gray-600">Welcome, {user.name}</div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Buttons */}
            {activeView !== 'dashboard' && (
              <button
                onClick={() => setActiveView('dashboard')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                ← Back to Dashboard
              </button>
            )}
            
            {/* Hamburger Menu */}
            <HamburgerMenu onMenuSelect={handleMenuSelect} />
            
            {/* Logout Button */}
            <button 
              onClick={onLogout} 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 h-[calc(100vh-80px)]">
        {renderContent()}
      </div>
    </div>
  );
}
