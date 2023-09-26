import Link from "next/link";
import Image from "next/image";

async function DriverList (){
    let data = await fetch("http://localhost:3000/api/driver/alldriver");
    data = data.json()
    return data
    }

    export default async function TotalUser() {
    let arr = await DriverList();
    let chatData = arr.data
    console.log(chatData,"000000000");
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Drivers Name
      </h4>

      <div className="max-h-60 overflow-y-auto">
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
      

            <div className="flex flex-1 items-center justify-between mx-4">
              <div>
                <h5 className="font-medium text-black dark:text-white text-blue-800">
                  {chat.username}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {chat.contactnumber}
                  </span>
                  <span className="text-xs text-orange-600">, Vehicle Number -  {chat.vehiclenumber}</span>
                </p>
              </div>
              {/* {chat.textCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {" "}
                    {chat.textCount}
                  </span>
                </div>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


