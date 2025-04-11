import MaintenanceChart from "./MaintenenceCharts";
import Navigation from "./Navigation";
import RefuelingChart from "./RefuelingCharts";
import VehicleMaintenancePieChart from "./VehicleMaintenceChart";
import VehicleRefuelingPieChart from "./VehicleRefuelingChart";

export default function Reports() {
    return (
        <>
            <Navigation />
            <div className="bg-white lg:pl-[22%] py-24 sm:py-32">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-base/7 font-semibold text-green-600">Reports</h2>
                    <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                        Reports for Vehicles
                    </p>
                    {/* <RefuelingChart /> */}
                    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                                <div className="pl-6 pt-6 pr-2"><RefuelingChart /></div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Refueling Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950"><span className="text-lg font-semibold text-green-600">Refueling</span> done per month in selected <span className="text-lg font-semibold text-green-600">(FY)</span></p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                                        The chart above shows the total refueling cost done per month in the selected Fiscal Year(FY).
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                        </div>
                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                                <div className="pl-6 pt-6 pr-2"><MaintenanceChart/></div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Maintenance Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950"><span className="text-lg font-semibold text-green-600">Maintenance</span> done per month in selected <span className="text-lg font-semibold text-green-600">(FY)</span></p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                                        The chart above shows the total Maintenance cost done per month in the selected Fiscal Year(FY).
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
                        </div>
                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                            <div className="pl-6 pt-6 pr-2"><VehicleRefuelingPieChart /></div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Vehicle Refueling Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950"><span className="text-lg font-semibold text-green-600">Refueling</span> done on NW Vehicle per month in selected <span className="text-lg font-semibold text-green-600">(FY)</span></p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                                        The chart above shows the total refueling cost done per month in the selected Fiscal Year(FY) for NW Vehicle.
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
                        </div>
                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                            <div className="pl-6 pt-6 pr-2"><VehicleMaintenancePieChart /></div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Vehicle Maintenance Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950"><span className="text-lg font-semibold text-green-600">Maintenance</span> done on NW Vehicle per month in selected <span className="text-lg font-semibold text-green-600">(FY)</span></p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                                        The chart above shows the total maintenance cost done per month in the selected Fiscal Year(FY) for NW Vehicle.
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}