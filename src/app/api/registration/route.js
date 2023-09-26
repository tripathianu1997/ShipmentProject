


import { NextResponse } from "next/server";
import pool from "../../../utils/db";
// import bcrypt from 'bcrypt';


export async function POST(request) {
  let payload = await request.json();

  // Extract relevant data from the payload for user insertion
  const { username, password, email, roleid } = payload;

  if (!username || !password || !email || !roleid ) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  // Extract relevant data from the payload for driver insertion
  const { vehiclenumber, licensenumber, contactnumber } = payload;

  try {
    // Insert user data
    const userQuery = "INSERT INTO users (username, password, email, roleid) VALUES ($1, $2, $3, $4)";
    const userValues = [username, password, email, roleid];

    // Insert driver data
    const driverQuery = "INSERT INTO drivers (vehiclenumber, licensenumber, contactnumber) VALUES ($1, $2, $3)";
    const driverValues = [vehiclenumber, licensenumber, contactnumber];

    // Start a transaction
    await pool.query("BEGIN");

    // Insert user data
    await pool.query(userQuery, userValues);

    // Insert driver data
    await pool.query(driverQuery, driverValues);

    // Commit the transaction
    await pool.query("COMMIT");

    return NextResponse.json({ result: "Successfully registered user and driver", success: true }, { status: 201 });
  } catch (error) {
    console.error("Error executing SQL queries:", error);

    // Rollback the transaction in case of an error
    await pool.query("ROLLBACK");

    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}


