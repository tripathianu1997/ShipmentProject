
// components/Sidebar.js
"use client"
import Link from 'next/link';
import { FaHome, FaUser, FaAvianex,FaGrinAlt } from 'react-icons/fa'; // Import icons
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    router.push("/");
    return null;
  }
  return (



    <aside className="bg-slate-950 text-white h-screen w-1/6 p-4 ">
      {/* {session.user && session.user.roleid == "2" ? (
        <>

          <div className="flex items-center mb-4 mt-9">

            <h1 className="text-xl font-semibold mx-5">Menu</h1>
          </div>

          <ul>

            <li>
              <Link href="/dashboard">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaHome className="mr-2" />
                  Home
                </p>
              </Link>
            </li>




            <li>
              <Link href="/dashboard/drivermanagement">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaUser className="mr-2" />
                  Driver Management
                </p>
              </Link>
            </li>



            <li>

              <Link href="/dashboard/shipmentmanagement">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaAvianex className="mr-2" />
                  Shipment Management
                </p>
              </Link>
            </li>

            <li>

              <Link href="/dashboard/usermanagement">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaGrinAlt className="mr-2" />
                  User Management
                </p>
              </Link>
            </li>


          </ul>
        </>
      ) : <>

        <div className="flex items-center mb-4 mt-9">

          <h1 className="text-xl font-semibold mx-5">Menu</h1>
        </div>

        <ul>

          <li>
            <Link href="/dashboard">
              <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                <FaHome className="mr-2" />
                Home
              </p>
            </Link>
          </li>




          <li>
            <Link href="/dashboard/driverdashboard">
              <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                <FaUser className="mr-2" />
                Driver Dashboard
              </p>
            </Link>
          </li>






        </ul>
      </>} */}

      {session.user && session.user.roleid == "2" ?(
          <>

          <div className="flex items-center mb-4 mt-9">

            <h1 className="text-xl font-semibold mx-5">Menu</h1>
          </div>

          <ul>

            <li>
              <Link href="/dashboard">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaHome className="mr-2" />
                  Home
                </p>
              </Link>
            </li>




            <li>
              <Link href="/dashboard/drivermanagement">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaUser className="mr-2" />
                  Driver Management
                </p>
              </Link>
            </li>



            <li>

              <Link href="/dashboard/shipmentmanagement">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaAvianex className="mr-2" />
                  Shipment Management
                </p>
              </Link>
            </li>

            <li>

              <Link href="/dashboard/usermanagement">
                <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                  <FaGrinAlt className="mr-2" />
                  User Management
                </p>
              </Link>
            </li>


          </ul>
        </>
      ):session.user && session.user.roleid == "1" ?(
        <>

        <div className="flex items-center mb-4 mt-9">

          <h1 className="text-xl font-semibold mx-5">Menu</h1>
        </div>

        <ul>

          <li>
            <Link href="/dashboard">
              <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                <FaHome className="mr-2" />
                Home
              </p>
            </Link>
          </li>




          <li>
            <Link href="/dashboard/driverdashboard">
              <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                <FaUser className="mr-2" />
                Driver Dashboard
              </p>
            </Link>
          </li>






        </ul>
      </>
      ): session.user && session.user.roleid == "3" ?(
        <>

        <div className="flex items-center mb-4 mt-9">
  
          <h1 className="text-xl font-semibold mx-5">Menu</h1>
        </div>
  
        <ul>
  
          <li>
            <Link href="/dashboard">
              <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                <FaHome className="mr-2" />
                Home
              </p>
            </Link>
          </li>
  
  
  
  
          <li>
            <Link href="/dashboard/userdashboard">
              <p className="flex items-center py-2 px-4 hover:bg-gray-600">
                <FaUser className="mr-2" />
                User Dashboard
              </p>
            </Link>
          </li>
  
  
  
  
  
  
        </ul>
      </>
      ):null
    }
    </aside>


  );
};

export default Sidebar;
