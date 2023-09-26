import { NextResponse } from "next/server";
import pool from "../../../../utils/db";


export async function POST(request) {
    let payload = await request.json();
  
    if (!payload.assigneddriverid ) {
      return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
    }
  
    try {
      const query = `SELECT
      t1.shipmentid,
      t1.customername,
      t1.destinationaddress,
      t1.shipmentstatus,
      t1.assigneddriverid,
      t1.planneddeliverydate,
      t1.actualdeliverydate,
      t2.username,
      t2.driverid
  FROM
      shipments AS t1
  LEFT JOIN
      users AS t2
      on t1.assigneddriverid = t2.driverid
  where t1.assigneddriverid= $1`;
      const values = [payload.assigneddriverid];
  
      const { rows } = await pool.query(query, values);

      console.log(rows);
  
      if (rows.length>0) {
        return NextResponse.json({ result: "Successfully Fetch Data",data:rows, success: true }, { status: 201 });
      } else {
        return NextResponse.json({ result: "Something Went Wrong", success: false }, { status: 404 });
      }
    } catch (error) {
      console.error("Error executing SQL query:", error);
      return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
  }
  