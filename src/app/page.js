import Layout from "./components/Layout"
// import Loginform from "./components/Loginform"
import Home from './components/Home'
import signIn from './signIn/page' ;
 


export default function page(){
  return(
    <Layout>
 <Home/>  

    </Layout>
  )
}

// import { SessionProvider } from "next-auth/react"

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     // `session` comes from `getServerSideProps` or `getInitialProps`.
//     // Avoids flickering/session loading on first load.
//     <Provider store={store}>
//     <SessionProvider session={session} refetchInterval={5 * 60}>
//       <Component {...pageProps} />
//     </SessionProvider>
//     </Provider>
//   )
// }