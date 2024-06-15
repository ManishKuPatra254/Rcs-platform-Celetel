import { Fragment, useEffect, useState } from "react"
import { Layout } from "../Layout/Layout"
import {
    Activity,
    BookOpenCheck,
    PackageCheck,
    Send,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCampaignsDetails } from "@/Service/auth.service"
import { Skeleton } from "@/components/ui/skeleton"
import { InitWebSocket } from "@/Routes/Websocket"
import { Button } from "@/components/ui/button"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const columns = [
    { id: 'templateName', label: 'Template Name' },
    { id: 'botId', label: 'Bot ID' },
    { id: 'campaignName', label: 'Campaign Name' },
    { id: 'totalNumbers', label: 'Total Numbers' },
    { id: 'status', label: 'Status' },
];


const getStatusColor = (status) => {
    if (status === "In progress") {
        return "text-blue-600 font-bold";
    } else if (status === "Pending") {
        return "text-yellow-600 font-bold";
    } else if (status === "Completed") {
        return "text-green-600 font-bold";
    } else if (status === "Failed") {
        return "text-red-600 font-bold";
    } else {
        return "text-gray-600 font-bold";
    }
};


export function Userdashboard() {

    const [campaigns, setCampaigns] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        InitWebSocket(setProgress);
    }, [])

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getCampaignsDetails();
                console.log(response.campaigns, "cam")
                const sortedCampaigns = response.campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCampaigns(sortedCampaigns);
            } catch (error) {
                console.error('Error fetching campaign data:', error.message);
            }
        };

        fetchCampaigns();
    }, []);



    const revenuemonthlystats = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    const ordermonthly = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            date: 3490,
            time: 4300,
            amt: 2100,
        },
    ];

    return (
        <Fragment>
            <Layout>
                <div className="grid gap-3 lg:grid-cols-4 lg:gap-4 md:grid-cols-2 sm:grid-cols-1 p-3 w-full">
                    <Card x-chunk="dashboard-05-chunk-0" className="flex-1 min-w-[250px] m-2 hover:bg-gray-200 transition">
                        <CardHeader className="pb-2">
                            <CardDescription className="flex gap-4 items-center">Total Campaigns </CardDescription>
                            <CardTitle className="text-xl flex justify-between gap-4 items-center">550 each min  <div className="bg-gray-300 p-1.5 rounded-sm">
                                <Send size={18} />
                            </div>
                            </CardTitle>

                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +56% from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* <Progress value={70} aria-label="12% increase" /> */}
                        </CardFooter>
                    </Card>

                    <Card x-chunk="dashboard-05-chunk-1" className="flex-1 min-w-[250px] m-2 hover:bg-gray-200 transition">
                        <CardHeader className="pb-2">
                            <CardDescription >Total Delivered</CardDescription>
                            <CardTitle className="text-xl flex justify-between gap-4 items-center">₹550 million
                                <div className="bg-red-300 p-1.5 rounded-sm">
                                    <PackageCheck size={18} />
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +110% from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* <Progress value={30} aria-label="12% increase" /> */}
                        </CardFooter>
                    </Card>

                    <Card x-chunk="dashboard-05-chunk-2" className="flex-1 min-w-[250px] m-2 hover:bg-gray-200 transition">
                        <CardHeader className="pb-2">
                            <CardDescription>Total Actions</CardDescription>
                            <CardTitle className="text-xl flex justify-between gap-4 items-center">₹550 million
                                <div className="bg-purple-300 p-1.5 rounded-sm">
                                    <Activity size={18} />
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +110% from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* <Progress value={50} aria-label="12% increase" /> */}
                        </CardFooter>
                    </Card>

                    <Card x-chunk="dashboard-05-chunk-3" className="flex-1 min-w-[250px] m-2 hover:bg-gray-200 transition">
                        <CardHeader className="pb-2">
                            <CardDescription>Total Read</CardDescription>
                            <CardTitle className="text-xl flex justify-between gap-4 items-center">₹550 million
                                <div className="bg-blue-300 p-1.5 rounded-sm">
                                    <BookOpenCheck size={18} />
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +83% from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* <Progress value={90} aria-label="12% increase" /> */}
                        </CardFooter>
                    </Card>
                </div>

                <main className="w-full grid mt-4 flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-16">
                    <div className="flex flex-col w-full gap-4 xl:flex-row lg:flex-row md:flex-col sm:flex-col">
                        <div className="grid justify-between gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 w-full">
                            <Card className="rounded-md">
                                <CardHeader className="flex justify-between">
                                    <Tabs defaultValue="monthly" className="w-full">
                                        <div className="p-4 flex justify-between items-center w-full">
                                            <h2 className='font-bold text-xl'>Revenue</h2>
                                            <TabsList>
                                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                                <TabsTrigger value="today">Today</TabsTrigger>
                                            </TabsList>
                                        </div>

                                        <TabsContent value="monthly">
                                            <Card x-chunk="dashboard-05-chunk-3" className="mb-4 border-transparent">
                                                <CardHeader className="px-7">
                                                    <CardTitle>
                                                    </CardTitle>
                                                    <CardDescription>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <AreaChart
                                                            data={revenuemonthlystats}
                                                            margin={{
                                                                top: 10,
                                                                right: 30,
                                                                left: 0,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" className="font-semibold text-xs" />
                                                            <YAxis className="font-semibold text-xs" />
                                                            <Tooltip />
                                                            <Area type="monotone" dataKey="uv" stroke="#C80036" fill="#C80036" />
                                                            <Area type="monotone" dataKey="pv" stroke="#EF9C66" fill="#EF9C66" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>

                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        <TabsContent value="weekly">
                                            <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                                <CardHeader className="px-7">
                                                    <CardTitle></CardTitle>
                                                    <CardDescription>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>


                                        <TabsContent value="today">
                                            <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                                <CardHeader className="px-7">
                                                    <CardTitle></CardTitle>
                                                    <CardDescription>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </CardHeader>
                            </Card>
                        </div>

                        <div className="w-full">
                            <Card className="rounded-md">
                                <CardHeader className="flex justify-between">
                                    <Tabs defaultValue="monthlyorder" className="w-full">
                                        <div className="p-4 flex justify-between items-center w-full">
                                            <h2 className='font-bold text-xl'>Orders Summary</h2>
                                            <TabsList>
                                                <TabsTrigger value="monthlyorder">Monthly</TabsTrigger>
                                                <TabsTrigger value="weeklyorder">Weekly</TabsTrigger>
                                                <TabsTrigger value="todayorder">Today</TabsTrigger>
                                            </TabsList>
                                        </div>

                                        <TabsContent value="monthlyorder">
                                            <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                                <CardHeader className="px-7">
                                                    <CardTitle></CardTitle>
                                                    <CardDescription>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <BarChart
                                                            data={ordermonthly}
                                                            margin={{
                                                                top: 5,
                                                                right: 30,
                                                                left: 20,
                                                                bottom: 5,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" className="text-xs font-semibold" />
                                                            <YAxis className="text-xs font-semibold" />
                                                            <Tooltip />
                                                            {/* <Legend /> */}
                                                            <Bar dataKey="pv" fill="#373A40" activeBar={<Rectangle fill="#B3C8CF" stroke="black" />} />
                                                            <Bar dataKey="uv" fill="#D8B4FE" activeBar={<Rectangle fill="#EFBC9B" stroke="purple" />} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        <TabsContent value="weeklyorder">
                                            <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                                <CardHeader className="px-7">
                                                    <CardTitle></CardTitle>
                                                    <CardDescription>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>


                                        <TabsContent value="todayorder">
                                            <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                                <CardHeader className="px-7">
                                                    <CardTitle></CardTitle>
                                                    <CardDescription>
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </CardHeader>
                            </Card>

                        </div>
                    </div>
                    <div className="">
                        <Card className="rounded-md">
                            <CardHeader className="flex justify-between">
                                <Tabs defaultValue="monthlycamp" className="w-full">
                                    <div className="p-4 flex justify-between items-center w-full">
                                        <h2 className='font-bold text-xl'>Recent Campaign Lists</h2>
                                        <TabsList>
                                            <TabsTrigger value="monthlycamp">Monthly</TabsTrigger>
                                            <TabsTrigger value="weeklycamp">Weekly</TabsTrigger>
                                            <TabsTrigger value="todaycamp">Today</TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <TabsContent value="monthlycamp">
                                        <Card x-chunk="dashboard-05-chunk-3" className="mb-4 border-transparent">
                                            <CardContent>
                                                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                                                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                                                        <div className="rounded-md border mt-4 text-center overflow-auto">
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        {columns.map((column) => (
                                                                            <TableHead key={column.id} className="text-center">
                                                                                {column.label}
                                                                            </TableHead>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {campaigns.length > 0 ? (
                                                                        campaigns.map((campaign) => (
                                                                            <TableRow key={campaign._id}>
                                                                                {columns.map((column) => (
                                                                                    column.id === 'status' ? (
                                                                                        <TableCell key={column.id} className={`text-center ${getStatusColor(campaign[column.id])}`}>
                                                                                            {campaign[column.id]}
                                                                                            <TooltipProvider>
                                                                                                <Tooltip>
                                                                                                    <TooltipTrigger asChild>
                                                                                                        <Button variant='ghost'>
                                                                                                            <Progress value={progress} className="w-32 h-2" />
                                                                                                        </Button>
                                                                                                    </TooltipTrigger>
                                                                                                    <TooltipContent className="text-sm">
                                                                                                        <p>{progress}%</p>
                                                                                                    </TooltipContent>
                                                                                                </Tooltip>
                                                                                            </TooltipProvider>
                                                                                        </TableCell>
                                                                                    ) : column.id === 'actions' ? null : (
                                                                                        <TableCell key={column.id} className="text-center">
                                                                                            {column.id === 'campaignName' ? (
                                                                                                <span className="block  truncate text-center">{campaign[column.id]}</span>
                                                                                            ) : (
                                                                                                campaign[column.id]
                                                                                            )}
                                                                                        </TableCell>
                                                                                    )
                                                                                ))}
                                                                            </TableRow>
                                                                        ))
                                                                    ) : (
                                                                        <TableRow>
                                                                            <TableCell colSpan={columns.length} align="center">
                                                                                <div className="flex flex-col space-y-3">
                                                                                    <Skeleton className="h-full w-full rounded-xl" />
                                                                                    <div className="space-y-2">
                                                                                        <Skeleton className="h-4 w-full" />
                                                                                        <Skeleton className="h-4 w-full" />
                                                                                    </div>
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )}
                                                                </TableBody>

                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    <TabsContent value="weeklycamp">
                                        <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                            <CardHeader className="px-7">
                                                <CardTitle></CardTitle>
                                                <CardDescription>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>


                                    <TabsContent value="todaycamp">
                                        <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                            <CardHeader className="px-7">
                                                <CardTitle></CardTitle>
                                                <CardDescription>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </CardHeader>
                        </Card>
                    </div>
                </main>
            </Layout>
        </Fragment >
    )
}
