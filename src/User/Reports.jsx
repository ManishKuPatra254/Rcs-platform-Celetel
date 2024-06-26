/* eslint-disable react/jsx-key */
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { CalendarIcon, EllipsisVertical, Eye, FolderUp, MousePointerClick, Pointer, Search } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Helmet } from 'react-helmet'
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"


const data = [
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

export default function Reports() {
    const location = useLocation();
    const isCampaignRoute = location.pathname.includes('/reports/campaign/');
    const [date, setDate] = useState()


    return (
        <Fragment>
            <Layout>
                {!isCampaignRoute && (
                    <Fragment>
                        <Helmet>
                            <title> Reports | RCS Celetel</title>
                        </Helmet>
                        <div className="flex md:flex-row justify-between items-center mt-3 px-7">
                            <CardTitle className='text-3xl'>
                                Reports
                            </CardTitle>

                            <div className="flex md:flex-row gap-4 items-center">
                                <Popover className="">
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Button className=''>
                                    <FolderUp className="mr-3 h-4 w-4" />
                                    Export</Button>
                            </div>
                        </div>

                        <div className="px-7">
                            <div className="relative ml-auto flex-1 md:grow-0">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-full mt-10"
                                />
                            </div>

                            <div className="">
                                <Card className="w-full mt-5 flex flex-col items-center justify-between xl:flex-row lg:flex-row md:flex-row sm:flex-row">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Campaigns</CardTitle>
                                    </CardHeader>
                                    <CardContent className=" flex flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-row gap-3 mt-5">
                                        <Select>
                                            <SelectTrigger className="w-[180px] font-semibold">
                                                <SelectValue placeholder="All Campaigns" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Fruits</SelectLabel>
                                                    <SelectItem value="apple">Apple</SelectItem>
                                                    <SelectItem value="banana">Banana</SelectItem>
                                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                                    <SelectItem value="grapes">Grapes</SelectItem>
                                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Select>
                                            <SelectTrigger className=" w-[250px] font-semibold">
                                                <SelectValue placeholder="Usage by Campaigns" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Fruits</SelectLabel>
                                                    <SelectItem value="apple">Apple</SelectItem>
                                                    <SelectItem value="banana">Banana</SelectItem>
                                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                                    <SelectItem value="grapes">Grapes</SelectItem>
                                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Select>
                                            <SelectTrigger className="w-[180px] font-semibold">
                                                <SelectValue placeholder="Filter" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Fruits</SelectLabel>
                                                    <SelectItem value="apple">Apple</SelectItem>
                                                    <SelectItem value="banana">Banana</SelectItem>
                                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                                    <SelectItem value="grapes">Grapes</SelectItem>
                                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button variant="outline">
                                            <EllipsisVertical className="h-5 w-5" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>


                            <Card className="w-full mt-5">
                                <CardHeader>
                                    <CardTitle>Create project</CardTitle>
                                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart
                                            data={data}>
                                            <XAxis dataKey="name" className='text-xs font-semibold' />
                                            <YAxis className='text-xs font-semibold' />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                </CardFooter>
                            </Card>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-3 px-6 lg:gap-4 md:grid-cols-2 sm:grid-cols-1 p-3 w-full">
                            <Card x-chunk="dashboard-05-chunk-0" className="flex-1 min-w-[250px] m-2 hover:bg-gray-200 transition">
                                <CardHeader className="">

                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-30 w-30 p-4 items-center justify-center rounded-sm bg-sky-100">
                                            <Eye className=' text-blue-400' />
                                        </div>
                                        <div>
                                            <p className="font-medium text-xl text-gray-900">Impressions</p>
                                            <p className="text-md font-bold text-gray-500">4,512</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {/* <Progress value={70} aria-label="12% increase" /> */}
                                </CardFooter>
                            </Card>

                            <Card x-chunk="dashboard-05-chunk-1" className="flex-1 min-w-[250px] m-2 hover:bg-gray-200 transition">
                                <CardHeader className="pb-2">

                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-30 w-30 p-4 items-center justify-center rounded-sm bg-sky-100">
                                            <MousePointerClick className=' text-blue-400' />
                                        </div>
                                        <div>
                                            <p className="font-medium text-xl text-gray-900">Clicks</p>
                                            <p className="text-md font-bold text-gray-500">2,552</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {/* <Progress value={30} aria-label="12% increase" /> */}
                                </CardFooter>
                            </Card>

                            <Card x-chunk="dashboard-05-chunk-3" className="flex-1 min-w-[250px] m-2 hover:bg-gray-200 transition">
                                <CardHeader className="pb-2">

                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-30 w-30 p-4 items-center justify-center rounded-sm bg-green-100">
                                            <Pointer className=' text-green-600' />
                                        </div>
                                        <div>
                                            <p className="font-medium text-xl text-gray-900">Click through rate</p>
                                            <p className="text-md font-bold text-gray-500">15%</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {/* <Progress value={90} aria-label="12% increase" /> */}
                                </CardFooter>
                            </Card>
                        </div>

                    </Fragment>
                )}
                <Outlet />
            </Layout>
        </Fragment>
    );
}
