import { NextResponse } from "next/server";
import pool from "../../../../utils/db";



/*
Anubhav Tripathi 
20-09-2023
*/

export async function POST(request) {
  let payload = await request.json();


  if (!payload.enterby) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const query = `SELECT 
    t1.shipmentid,
    t1.customername,
    t1.destinationaddress,
    t1.shipmentstatus,
    t1.planneddeliverydate,
    t1.actualdeliverydate,
    t2.username as drivername,
    t2.email as driveremail,
    t2.roleid as driverrole
   FROM 
       shipments t1
   LEFT JOIN 
       users t2
   ON 
       t1.assigneddriverid = t2.driverid where t1.enterby=$1`;
    const values = [payload.enterby];

    const { rows } = await pool.query(query, values);

    if (rows.length>0) {
      return NextResponse.json({ result: "Successfully Fetched",data:rows, success: true }, { status: 201 });
    } else {
      return NextResponse.json({ result: "Shipment not found", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}
