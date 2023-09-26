import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

export async function GET() {
    try {
      const query = `SELECT
      t1.username,
      t1.userid,
      t1.email,
      t1.roleid,
      t1.driverid,
      t1.password,
      t2.vehiclenumber,
      t2.licensenumber,
      t2.contactnumber
  FROM
      users AS t1
  LEFT JOIN
      drivers AS t2
  ON
      t1.driverid = t2.driverid
      where t1.roleid='3'`;
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