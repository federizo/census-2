import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Label, Pie, PieChart } from "recharts"


const chartData = [
    { month: "January", female: 186, male: 80 },
    { month: "February", female: 305, male: 200 },
    { month: "March", female: 237, male: 120 },
    { month: "April", female: 73, male: 190 },
    { month: "May", female: 209, male: 130 },
    { month: "June", female: 214, male: 10 },
    { month: "July", female: 4, male: 140 },
    { month: "August", female: 24, male: 40 },
    { month: "September", female: 21, male: 130 },
    { month: "October", female: 21, male: 140 },
    { month: "November", female: 14, male: 10 },
    { month: "December", female: 24, male: 3 },
]

const Population = [
    { browser: "KM 37", visitors: 275, fill: "#4285F4" }, // Blue
    { browser: "KM 38", visitors: 200, fill: "#FFAC45" }, // Orange
    { browser: "KM 39", visitors: 287, fill: "#FF7139" }, // Red
    { browser: "KM 40", visitors: 173, fill: "#0078D7" },   // Dark Blue
    { browser: "other", visitors: 190, fill: "#AAAAAA" },  // Grey
];

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

const CensusGraph = () => {

    const data = []
    return <div className="flex gap-4 w-full h-full overflow-y-auto">
        <div className="w-full h-1/2 dark:bg-graident-dark rounded-md shadow-md py-4">
            <div className="w-full text-center p-2 tracking-wide">Female and Male recorded for each month</div>
            <ChartContainer config={chartConfig} className="h-full w-full">
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
        <div className="w-full  dark:bg-graident-dark rounded-md shadow-md py-4">
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
                        data={Population}
                        dataKey="visitors"
                        nameKey="browser"
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
                                                1,345
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
                {Population.map((item, index) => (
                    <div className="flex flex-col items-center" key={index}>
                        <label className="uppercase text-sm font-thin">{item.browser}</label>
                        <label className="uppercase ">{item.visitors}</label>
                        <div
                            key={index}
                            className="h-5 w-5 rounded-md"
                            style={{ backgroundColor: item.fill }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
};

export default CensusGraph;
