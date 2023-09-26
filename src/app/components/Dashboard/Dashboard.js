import Header from "../DashboardGrapgh/Header/Header";
import Donut from "../DashboardGrapgh/DonutChart/Donut";
import TotalUser from "../DashboardGrapgh/TotalUser/TotalUser";

export default function DashboardPage() {
    return (
        <div>
            <Header />
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-12 2xl:mt-7.5 2xl:gap-7.5 md:col-span-4">
                <Donut />
                <br/><br/>
                <div className="col-span-12 md:col-span-4"> {/* Adjust the col-span as needed */}
                    <TotalUser />
                </div>
            </div>
        </div>
    )
}
