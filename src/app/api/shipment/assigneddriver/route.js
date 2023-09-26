import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

export async function POST(request) {
  let payload = await request.json();

  if (!payload.assigneddriverid || !payload.shipmentid) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const query = `UPDATE shipments SET assigneddriverid= $1,shipmentstatus=$2 WHERE shipmentid = $3`;
    const values = [payload.assigneddriverid,'In Transit',payload.shipmentid];

    const { rowCount } = await pool.query(query, values);

    if (rowCount === 1) {
      return NextResponse.json({ result: "Successfully updated shipment", success: true }, { status: 201 });
    } else {
      return NextResponse.json({ result: "Shipment not found", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}
