import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

export async function GET() {
    try {
      const query = `SELECT
      COUNT(*) FILTER (WHERE shipmentstatus = 'delivered') AS DeliveredShipment,
      COUNT(*) FILTER (WHERE shipmentstatus = 'Pending') AS PendingShipment,
      COUNT(*) FILTER (WHERE shipmentstatus = 'In Transit') AS InTransitShipment,
      COUNT(*) AS TotalShipment
  FROM shipments`;
      const { rows } = await pool.query(query);
      if (rows.length > 0) {
        return NextResponse.json({ result: "Successfully Data Fetch", data: rows }, { status: 200 });
      } else {
        return NextResponse.json({ result: "No data found", success: false }, { status: 404 });
      }
    } catch (error) {
      console.error("Error executing SQL query:", error);
      return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
  }