import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { getFamMember } from "@/lib/api/apitGET";


const chartConfig = {
    female: {
        label: "Female",
        color: "#ffc0cb",
    },
    male: {
        label: "Male",
        color: "#60a5fa",
    },
} satisfies ChartConfig


const CensusGraphMaleFemale = ({ year }: { year: number }) => {

    const [chartData, setChartData] = useState<any>([
        { month: "January", female: 0, male: 0 },
        { month: "February", female: 0, male: 0 },
        { month: "March", female: 0, male: 0 },
        { month: "April", female: 0, male: 0 },
        { month: "May", female: 0, male: 0 },
        { month: "June", female: 0, male: 0 },
        { month: "July", female: 0, male: 0 },
        { month: "August", female: 0, male: 0 },
        { month: "September", female: 0, male: 0 },
        { month: "October", female: 0, male: 0 },
        { month: "November", female: 0, male: 0 },
        { month: "December", female: 0, male: 0 },
    ])

    const [dataDB, setDataDB] = useState<any>([])

    useEffect(() => {
        const handleFetchMembers = async () => {
            const response = await getFamMember()
            setDataDB(response)
        }

        handleFetchMembers()
        console.log(dataDB);

    }, [])

    useEffect(() => {
        if (dataDB.length > 0) {
            const updatedChartData = chartData.map((entry: any) => {
                const monthIndex = new Date(`${entry.month} 1, ${year}`).getMonth();
                const monthData = dataDB.filter((item: any) => {
                    const itemMonth = new Date(item.created_at).getMonth();
                    return itemMonth === monthIndex;
                });

                return {
                    ...entry,
                    male: monthData.filter((item: any) => item.Gender === "male").length,
                    female: monthData.filter((item: any) => item.Gender === "female").length,
                };
            });

            setChartData(updatedChartData);
        }
    }, [dataDB]);

    return <div className="w-full h-full dark:bg-graident-dark rounded-md shadow-md py-2 border-[1px]">
        <div className="w-full text-center p-2 tracking-wide">Female and Male recorded for each month ({year})</div>
        <ChartContainer config={chartConfig} className="h-[90%] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="male" fill="var(--color-male)" radius={4} />
                <Bar dataKey="female" fill="var(--color-female)" radius={4} />
            </BarChart>
        </ChartContainer>

    </div>
};

export default CensusGraphMaleFemale;
