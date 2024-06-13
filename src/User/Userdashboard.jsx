import { Fragment } from "react"
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
import { XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


const campaigntable = [
    {
        slno: "1",
        paymentStatus: "In progress",
        botId: "Quiz India Movement",
        totalAmount: "$250.00",
        templateName: "Template 1",
        campaignName: "Campaign 1"
    },
    {
        slno: "2",
        paymentStatus: "Pending",
        botId: "Health Potli",
        totalAmount: "$150.00",
        templateName: "Template 2",
        campaignName: "Campaign 2"

    },
    {
        slno: "3",
        paymentStatus: "Completed",
        botId: "Database Solutions Services",
        totalAmount: "$350.00",
        templateName: "Template 3",
        campaignName: "Campaign 3"

    },
    {
        slno: "4",
        paymentStatus: "In progress",
        botId: "Manipal TRUtest",
        totalAmount: "$450.00",
        templateName: "Template 4",
        campaignName: "Campaign 4"
    },
    {
        slno: "5",
        paymentStatus: "Completed",
        botId: "Atlytic",
        totalAmount: "$550.00",
        templateName: "Template 5",
        campaignName: "Campaign 5"
    },
    {
        slno: "6",
        paymentStatus: "In progress",
        botId: "VAPP",
        totalAmount: "$200.00",
        templateName: "Template 6",
        campaignName: "Campaign 6"
    },
    {
        slno: "7",
        paymentStatus: "Failed",
        botId: "LOANSI",
        totalAmount: "$300.00",
        templateName: "Template 7",
        campaignName: "Campaign 7"
    },
]

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
            uv: 3490,
            pv: 4300,
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
                            <Progress value={70} aria-label="12% increase" />
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
                            <Progress value={30} aria-label="12% increase" />
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
                            <Progress value={50} aria-label="12% increase" />
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
                            <Progress value={90} aria-label="12% increase" />
                        </CardFooter>
                    </Card>
                </div>

                <main className="w-full grid mt-4 flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-16">
                    <div className="flex w-full gap-4 lg:flex-row md:flex-col sm:flex-col">
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 min-w-[675px]">
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
                                                    <AreaChart
                                                        width={600}
                                                        height={300}
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

                        <div className="min-w-[675px]">
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
                                                    <BarChart
                                                        width={600}
                                                        height={300}
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
                                        <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                            <CardHeader className="px-7">
                                                <CardTitle></CardTitle>
                                                <CardDescription>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="rounded-md border mt-4 overflow-auto">
                                                    <Table>
                                                        <TableCaption></TableCaption>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead className="w-[100px]">Sl No.</TableHead>
                                                                <TableHead>Template Name</TableHead>
                                                                <TableHead>Bot Id</TableHead>
                                                                <TableHead>Campaign Name</TableHead>
                                                                <TableHead>Status</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {campaigntable.map((invoice) => (
                                                                <TableRow key={invoice.slno}>
                                                                    <TableCell className="font-medium">{invoice.slno}</TableCell>
                                                                    <TableCell>{invoice.templateName}</TableCell>
                                                                    <TableCell>{invoice.botId}</TableCell>
                                                                    <TableCell>{invoice.campaignName}</TableCell>
                                                                    <TableCell className={getStatusColor(invoice.paymentStatus)}>
                                                                        {invoice.paymentStatus}
                                                                    </TableCell>                                                                </TableRow>
                                                            ))}
                                                        </TableBody>

                                                    </Table>
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
        </Fragment>
    )
}
