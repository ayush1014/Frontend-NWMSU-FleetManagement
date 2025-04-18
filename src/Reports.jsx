import { useState } from "react";
import MaintenanceChart from "./MaintenenceCharts";
import Navigation from "./Navigation";
import RefuelingChart from "./RefuelingCharts";
import VehicleInfoReportTable from "./VehicleInfoReportTable";
import VehicleMaintenanceChart from "./VehicleMaintenceChart";
import MaintenanceReportTable from "./VehicleMaintenceReport";
import VehicleRefuelingChart from "./VehicleRefuelingChart";
import RefuelingReportTable from "./VehicleRefuelingReport";
import VehicleReport from "./VehicleReport";
import { OrbitProgress } from "react-loading-indicators";

export default function Reports() {
    const [loadingStates, setLoadingStates] = useState({
        refuelingChart: true,
        maintenanceChart: true,
        vehicleReport: true,
    });

    const allLoaded = Object.values(loadingStates).every((v) => v === false);

    const setLoaded = (key) => () =>
        setLoadingStates((prev) => ({ ...prev, [key]: false }));

    return (
        <>
            <Navigation />
            {!allLoaded ? (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                    <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                </div>
            ) : null}

            <div className="bg-white lg:pl-[22%] lg:pr-[4%] py-24 sm:py-12">
                <div className="mx-auto max-w-2xl lg:max-w-7xl">
                    <h2 className="text-base/7 font-semibold text-green-600">Reports</h2>
                    <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                        Reports for Vehicles
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                                <div className="pl-6 pt-6 pr-2">
                                    <RefuelingChart onLoad={setLoaded("refuelingChart")} />
                                </div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Refueling Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950">
                                        Refueling done per month in selected FY
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                        </div>

                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                                <div className="pl-6 pt-6 pr-2">
                                    <MaintenanceChart onLoad={setLoaded("maintenanceChart")} />
                                </div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Maintenance Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950">
                                        Maintenance done per month in selected FY
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
                        </div>

                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                                <div className="pl-6 pt-6 pr-2">
                                    <VehicleRefuelingChart />
                                </div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Vehicle Refueling Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950">
                                        Refueling by NW Vehicle per month in selected FY
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
                        </div>

                        <div className="relative lg:col-span-3">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                                <div className="pl-6 pt-6 pr-2">
                                    <VehicleMaintenanceChart />
                                </div>
                                <div className="p-10 pt-8">
                                    <h3 className="text-sm/4 font-semibold text-green-600">Vehicle Maintenance Report</h3>
                                    <p className="mt-2 text-base font-medium tracking-tight text-gray-950">
                                        Maintenance by NW Vehicle per month in selected FY
                                    </p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                        </div>
                    </div>
                </div>

                <div className="mt-24">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div>
                            <p className="mt-2 ml-12 text-2xl font-semibold text-gray-950">
                                Overall Reports for <span className="text-green-700">Vehicles</span>
                            </p>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <VehicleReport onLoad={setLoaded("vehicleReport")} />
                        </div>
                    </div>
                </div>

                <div className="mt-24">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div>
                            <p className="mt-2 ml-12 text-2xl font-semibold text-gray-950">
                                Refueling <span className="text-green-700">Reports</span>
                            </p>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <RefuelingReportTable />
                        </div>
                    </div>
                </div>
                <div className="mt-24">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div>
                            <p className="mt-2 ml-12 text-2xl font-semibold text-gray-950">
                                Maintenance <span className="text-green-700">Reports</span>
                            </p>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <MaintenanceReportTable />
                        </div>
                    </div>
                </div>
                <div className="mt-24">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                        <div>
                            <p className="mt-2 ml-12 text-2xl font-semibold text-gray-950">
                                Vehicle <span className="text-green-700">Reports</span>
                            </p>
                        </div>
                        <VehicleInfoReportTable />
                    </div>
                </div>
            </div>
        </>
    );
}
