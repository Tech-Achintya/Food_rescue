import { useEffect, useState } from 'react';
import { get } from '../api';

export default function NGOContact() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        // We'll need to create an endpoint to get NGO users
        // For now, let's create a mock endpoint or use existing auth endpoint
        const response = await get('/auth/users?role=NGO');
        setNgos(response);
      } catch (error) {
        console.error('Failed to fetch NGOs:', error);
        // Mock data for now
        setNgos([
          {
            id: 1,
            name: "Food Rescue Foundation",
            contact: "+91 9876543210",
            email: "contact@foodrescue.org",
            address: "123 Charity Street, City Center",
            description: "Dedicated to reducing food waste and helping communities"
          },
          {
            id: 2,
            name: "Hunger Relief NGO",
            contact: "+91 8765432109",
            email: "help@hungerrelief.org",
            address: "456 Service Road, Downtown",
            description: "Working towards zero hunger in our community"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading NGO contacts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">NGO Contacts</h2>
      
      {ngos.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">No NGO contacts available</div>
          <div className="text-gray-400 text-sm mt-2">NGO contact information will appear here</div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {ngos.map((ngo) => (
            <div key={ngo.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{ngo.name}</h3>
                  {ngo.description && (
                    <p className="text-gray-600 text-sm mb-3">{ngo.description}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm">📞</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium text-gray-800">{ngo.contact}</div>
                  </div>
                </div>
                
                {ngo.email && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✉️</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium text-gray-800">{ngo.email}</div>
                    </div>
                  </div>
                )}
                
                {ngo.address && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 text-sm">📍</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="font-medium text-gray-800">{ngo.address}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Call Now
                  </button>
                  {ngo.email && (
                    <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">
                      Send Email
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}