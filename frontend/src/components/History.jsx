import { useEffect, useState } from 'react';
import { get } from '../api';

export default function History({ user }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const allPackages = await get('/packages');
        // Filter packages created by this user (mess head)
        const userPackages = allPackages.filter(pkg => pkg.created_by === user.id);
        setPackages(userPackages);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'DELIVERED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading history...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>
      
      {packages.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">No orders found</div>
          <div className="text-gray-400 text-sm mt-2">Your order history will appear here</div>
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{pkg.package_code}</h3>
                  <p className="text-gray-600">{pkg.hostel_name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pkg.status)}`}>
                  {pkg.status}
                </span>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                <div className="flex flex-wrap gap-2">
                  {pkg.items && pkg.items.map((item, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {item.food_name} ({item.quantity})
                    </span>
                  ))}
                </div>
              </div>
              
              {pkg.remarks && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-700">Remarks:</h4>
                  <p className="text-gray-600 text-sm">{pkg.remarks}</p>
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                Created: {new Date(pkg.created_at).toLocaleDateString()} at {new Date(pkg.created_at).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}