import {Outlet} from "react-router-dom"
import {Navbar} from "../Components/Navbar/Navbar"
import {Header} from "../Components/Header/Header"
import {Footer} from "../Components/Footer/Footer"
import { UserPanel } from "../Components/UserPanel/UserPanel"

export function MainLayout (){
    return (
        <>
        <Navbar/>
        <Header/>
        <UserPanel/>
        <Outlet/>
        <Footer/>
        </>
    )

}