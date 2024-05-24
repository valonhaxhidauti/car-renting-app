// "use client"

// import { X } from "lucide-react";
// import React, { useState } from "react";

// const LocationsModal = ({ showModal, toggleModal,  handleLocationSelect }) => {
//     const [locations, setLocations] = useState([]);

//     const fetchLocations = async () => {
//         const url = new URL("https://rent-api.rubik.dev/api/locations");
//         // const params = { "filter[search]": "Latvia" };
//         // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
//         const headers = {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         };
    
//         const response = await fetch(url, { method: "GET", headers });
//         const data = await response.json();
//         console.log(data);
//         setLocations(data.data); // Assuming the API response is an array of locations
//       };
  
//   return (
//     <div className={`absolute z-50 max-w-lg bg-white shadow-xl border-borderGray border w-[90vw] top-12 p-8 rounded-xl ${showModal ? "block" : "hidden"}`}>
//       <div className="w-full text-xl text-center">Select Location</div>
//       <div className="absolute top-4 right-4 rounded-full p-2 flex hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer">
//         <X onClick={toggleModal} />
//       </div>
//       <div className="scrollbar w-full flex flex-col overflow-auto max-h-80">
//         {locations.map((location, index) => (
//           <div key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleLocationSelect(location.name)}>
//             {location.attributes.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LocationsModal;
