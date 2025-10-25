import { useEffect, useState } from 'react';
import { get, post } from '../api';

export default function NGOView({user}) {
  const [packages, setPackages] = useState([]);
  const [showAcceptFor, setShowAcceptFor] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({name:'', contact:'', arrival_time:''});

  useEffect(()=>{ get('/packages').then(setPackages); },[]);

  const openAccept = (pkg) => { setShowAcceptFor(pkg); }

  const submitAccept = async () => {
    const payload = {
      ngo_id: user.id,
      delivery_person_name: deliveryInfo.name,
      delivery_person_contact: deliveryInfo.contact,
      arrival_time: deliveryInfo.arrival_time
    };
    const res = await post(`/packages/${showAcceptFor.id}/accept`, payload);
    alert('Accepted: ' + res.id);
    setShowAcceptFor(null);
  };

  return (
    <div className="p-4">
      <h3>Available Items</h3>
      <div className="space-y-3">
        {packages.filter(p=>p.status==='AVAILABLE').map(p=>(
          <div key={p.id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div><b>{p.package_code}</b> - {p.hostel_name}</div>
                <div>{p.items.map(i=>`${i.food_name}(${i.quantity})`).join(', ')}</div>
              </div>
              <div>
                <button onClick={()=>openAccept(p)} className="p-2 bg-green-600 text-white">Accept</button>
              </div>
            </div>
            {showAcceptFor && showAcceptFor.id === p.id && (
              <div className="mt-3">
                <input placeholder="Delivery person name" value={deliveryInfo.name} onChange={e=>setDeliveryInfo({...deliveryInfo,name:e.target.value})} className="p-2 border mr-2"/>
                <input placeholder="Contact" value={deliveryInfo.contact} onChange={e=>setDeliveryInfo({...deliveryInfo,contact:e.target.value})} className="p-2 border mr-2"/>
                <input type="datetime-local" value={deliveryInfo.arrival_time} onChange={e=>setDeliveryInfo({...deliveryInfo,arrival_time:e.target.value})} className="p-2 border mr-2"/>
                <button onClick={submitAccept} className="p-2 bg-blue-600 text-white">Submit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
