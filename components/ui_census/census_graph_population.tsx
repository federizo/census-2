import React, { useState, useEffect } from "react";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Label, Pie, PieChart } from "recharts"
import { getHouseProfile } from "@/lib/api/apitGET";

const pouplationCofig = {
    visitors: {
        label: "Overall Population",
    },
    km37: {
        label: "KM 37",
        color: "hsl(var(--chart-1))",
    },
    km38: {
        label: "KM 38",
        color: "hsl(var(--chart-2))",
    },
    km39: {
        label: "KM 39",
        color: "hsl(var(--chart-3))",
    },
    km40: {
        label: "KM 40",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

const CensusGraphPopulation = () => {

    const [chartData, setChartData] = useState<any>([
        { kilometer: "37", population: 0, fill: "#4285F4" }, // Blue
        { kilometer: "38-A", population: 0, fill: "#FFAC45" }, // Orange
        { kilometer: "38-B", population: 0, fill: "#e6ff33" }, // Orange
        { kilometer: "38-POBLACION", population: 0, fill: "#C70039" }, // Orange
        { kilometer: "39", population: 0, fill: "#FF7139" }, // Red
        { kilometer: "40", population: 0, fill: "#0078D7" },   // Dark Blue
        { kilometer: "other", population: 0, fill: "#AAAAAA" },  // Grey
    ])

    const [dataDB, setDataDB] = useState<any>([])

    useEffect(() => {
        const handleFetchMembers = async () => {
            const response = await getHouseProfile()
            setDataDB(response)
        }

        handleFetchMembers()
    }, [])


    useEffect(() => {
        const updatedChartData = chartData.map((item: any) => {
            let count = 0;

            dataDB.forEach((entry: any) => {
                entry.Location.forEach((location: any) => {
                    if (location.Kilometer === item.kilometer) {
                        count += parseInt(entry.NumberofMembers || "0", 10);
                    }
                });
            });

            return {
                ...item,
                population: count,
            };
        });

        // Handle other locations not matching KM 37-40
        const otherCount = dataDB.reduce((total: number, entry: any) => {
            const isOther = entry.Location.every(
                (location: any) =>
                    !["37", "38-A", "38-B", "38-POBLACION", "39", "40"].includes(location.Kilometer)
            );
            if (isOther) {
                return total + parseInt(entry.NumberofMembers || "0", 10);
            }
            return total;
        }, 0);

        setChartData((prevData: any) =>
            updatedChartData.map((data: any) =>
                data.kilometer === "other"
                    ? { ...data, population: otherCount }
                    : data
            )
        );

    }, [dataDB])

    return <div className="w-full h-full bg-black dark:bg-graident-dark rounded-md shadow-md py-2 border-[1px]">
        <div className="w-full text-center p-2 ">Overall Population For Each KM</div>
        <ChartContainer
            config={pouplationCofig}
            className="mx-auto aspect-square max-h-[250px]"
        >
            <PieChart width={300} height={300}>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="population"
                    nameKey="kilometer"
                    innerRadius={70}
                    strokeWidth={2}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {chartData.reduce(
                                                (total: number, item: any) =>
                                                    total + item.population,
                                                0
                                            )}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Overall Population
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
        <div className="px-10 flex justify-evenly">
            {chartData.map((item: any, index: any) => (
                <div className="flex flex-col items-center" key={index}>
                    <label className="uppercase text-sm font-thin">{item.kilometer !== "other" && "KM "}{item.kilometer}</label>
                    <label className="uppercase ">{item.population}</label>
                    <div
                        key={index}
                        className="h-5 w-5 rounded-md"
                        style={{ backgroundColor: item.fill }}
                    ></div>
                </div>
            ))}
        </div>
    </div>

};

export default CensusGraphPopulation;
