
import pool from "../../../../utils/db";
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "user", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const client = await pool.connect();

        try {
          console.log("Email:", credentials.email); // Log the email
          console.log("Password:", credentials.password); // Log the password

          console.log("I'm here");
          if (client) {
            console.log("Connected to the database successfully"); 
          }

          
          const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
          const params = [credentials.email, credentials.password];
          console.log("SQL Query:", sql);
          console.log("SQL Parameters:", params);

          const result = await client.query(sql, params);
          console.log(result.rows, "rowsss");

          if (result.rows.length > 0) {
            const user = result.rows[0];
            console.log(user,"user")

           
            return Promise.resolve(user);
          }

          return Promise.resolve(null); // Failed login
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve(null); // Failed login due to an error
        } finally {
          client.release();
        }
        
      }
    })
  ],
  
  secret: process.env.NEXTAUTH_SECRET, 
  
  pages: {
    signIn: '/signIn'
  },
  session: {
    jwt: true,
    maxAge: 60000,
  },
  callbacks: {
    async jwt({token, user,session}) {
      console.log("User object:", { user}); //
      if (user) {
        console.log("I'm hereeeeeeee");
        token.email = user.email; 
      }

      return { ...token, ...user }
    },
    async session({session, token}) {
      console.log(token,'hello');
      session.user = token;
      return session;
     
    }
  }
});


export { handler as GET, handler as POST };







