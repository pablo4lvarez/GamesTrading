import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        
        const res = await axios.post(
          process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/users/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log('res:', res);

        const user = res.data;
        console.log('userData:', user);

        // If no error and we have user data, return it
        if (res.status == 200 && user) {
          console.log('status is 200!')
          console.log('user:', user);
          return user
        } else {
          console.log(res.data);
          throw new Error('error');
          
        }
        
      },
    }),
  ],
  pages: {
    signIn: "./pages/login",
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      // return final_token
      return params.token;
    },
  },
  
};

export default NextAuth(authOptions);