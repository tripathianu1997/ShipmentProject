import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

export async function POST(request) {
  let payload = await request.json();

  // Extract relevant data from the payload
  const { customername, destinationaddress, planneddeliverydate, enterby, status } = payload;
  console.log(payload,"uyyyyy");

  if (!customername || !destinationaddress  || !planneddeliverydate,!enterby||!status) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const query = "INSERT INTO shipments (customername, destinationaddress, shipmentstatus, planneddeliverydate,enterby,status) VALUES ($1, $2,$3, $4,$5,$6)";
    const values = [customername, destinationaddress,'Pending', planneddeliverydate,enterby,status];

    await pool.query(query, values);

    

    return NextResponse.json({ result: "Successfully registered", success: true }, { status: 201 });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}




