// import { NextResponse } from "next/server";
// import pool from "../../../../utils/db";



// /*
// Anubhav Tripathi 
// 09-09-2023
// */

// export async function POST(request) {
//   let payload = await request.json();
//   console.log(payload,"pay");

//   const { username } = payload; 
//   if (!username) {
//     return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
//   }

//   try {
//     const query = `SELECT * FROM users
//     WHERE username ILIKE $1 AND roleid = '1'`
//     const values = [`${username}%`];

//     const { rows } = await pool.query(query, values);

//     if (rows.length > 0) {
//       return NextResponse.json({ result: "Successfully Data Fetch", data: rows, success: true }, { status: 201 });
//     } else {
//       return NextResponse.json({ result: "User not found", success: false }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Error executing SQL query:", error);
//     return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

/*
Anubhav Tripathi
09-09-2023
*/

// export async function GET(request) {
//         try {
//           const payload = JSON.parse(request.query.payload || '{}');
//           const searchTerm = payload.search;
      
//           if (!searchTerm) {
//             return NextResponse.json({ result: "Search term not provided", success: false }, { status: 400 });
//           }
      
//           // Your SQL query logic goes here
//           const query = `
//             SELECT * FROM users
//             WHERE username ILIKE $1 AND roleid = '1'
//           `;
//           const values = [`${searchTerm}%`];
      
//           // Execute the SQL query and handle the results
//           // Replace this with your database query logic
//           const { rows } = await pool.query(query, values); // Replace with your actual database query
      
//           if (rows.length > 0) {
//             return NextResponse.json({ result: "Successfully Data Fetch", data: rows, success: true }, { status: 200 });
//           } else {
//             return NextResponse.json({ result: "User not found", success: false }, { status: 404 });
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           return NextResponse.json({ result: "Server error", success: false }, { status: 500 });
//         }
//       }
  

export async function GET(req, res) {

      try {
        const { username } = req.query;
  
        // Define the SQL query
        const sql = `
          SELECT * FROM users
          WHERE username ILIKE $1 AND roleid = '1'
        `;
  
        // Execute the query
        const { rows } = await pool.query(sql, [`%${username}%`]);
  
        return NextResponse.json(rows);
      } catch (error) {
        console.error(error);
        return NextResponse.error('Internal Server Error');
      }
    
  
   
  }
  



  
