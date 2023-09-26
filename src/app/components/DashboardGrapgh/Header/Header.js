import React from "react";
import {
  FaChartBar,
  FaChartPie,
  FaUsers,
  FaPercent,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";



async function ShipmentList (){
let data = await fetch("http://localhost:3000/api/Dashboard/adminDashboard");
data = data.json()
return data
}

export default async function Header() {
  let shipment = await ShipmentList();
  console.log(shipment.data);
  return (
    <div className="bg-gradient-dark pb-8 pt-5 pt-md-8">
      <div className="container mx-auto px-4">
        <div className="header-body">
          {/* Card stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-xl p-4 flex items-center">
               
                <div>
                  <h5 className="text-uppercase text-gray-600 mb-2 ">Total Shipment</h5>
                  <span className="text-2xl font-bold text-gray-800">{shipment.data[0].totalshipment}</span>
                  <p className="mt-3 mb-0 text-gray-600">
                    <span className="text-success mr-2 text-lime-800">
                      <FaArrowUp /> 3.48%
                    </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
                {/* <div className="mr-4 bg-rose-800 rounded-lg">
                  <FaChartBar className="text-primary text-2xl " />
                </div> */}
              </div>
            
            </div>
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-4">
                <h5 className="text-uppercase text-gray-600 mb-2">Pending</h5>
                <span className="text-2xl font-bold text-gray-800">{shipment.data[0].pendingshipment}</span>
                <p className="mt-3 mb-0 text-gray-600">
                  <span className="text-danger mr-2 text-rose-900	">
                    <FaArrowDown /> 3.48%
                  </span>{" "}
                  <span className="text-nowrap">Since last week</span>
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-4">
                <h5 className="text-uppercase text-gray-600 mb-2">In Transit</h5>
                <span className="text-2xl font-bold text-gray-800">{shipment.data[0].intransitshipment}</span>
                <p className="mt-3 mb-0 text-gray-600">
                  <span className="text-warning mr-2 text-amber-500	" >
                    <FaArrowDown /> 1.10%
                  </span>{" "}
                  <span className="text-nowrap">Since yesterday</span>
                </p>
                {/* <div className="mt-4">
                  <FaChartBar className="text-warning text-2xl" />
                </div> */}
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-4">
                <h5 className="text-uppercase text-gray-600 mb-2">Delivery</h5>
                <span className="text-2xl font-bold text-gray-800">{shipment.data[0].deliveredshipment}</span>
                <p className="mt-3 mb-0 text-gray-600">
                  <span className="text-success mr-2  text-lime-800">
                    <FaArrowUp /> 12%
                  </span>{" "}
                  <span className="text-nowrap">Since last month</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


