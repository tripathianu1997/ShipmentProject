"use client"
import { useEffect } from "react";
import Driver from "../../components/DriverManagement/Driver";
import LayoutD from "../../components/LayoutD";
import { useSession, signIn } from "next-auth/react";
export default function DriverManagement(){
   
    const { data: session, status } = useSession();
    return(
        <LayoutD user={session && session.user ? session.user.username : null}>
            <Driver/>
        </LayoutD>
    )
}