import { Fragment } from "react"
import { Layout } from "../Layout/Layout"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    File,
    ListFilter,
    MoreVertical,
    Package2,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Dashboard() {
    const cUrl = `
    curl--location \\
    --request POST 'https://rcsapi.celetel.com/v1/rcs?api_key=3d0d9925-365e-47ca-b30f-6c9a89341339' \\
    --header 'Content-Type: application/json' \\
    --data - raw '{
    "to": [
        "+919876543210"
    ],
        "template_id": "qwetrtyu",
            "bot_id": "sfdsfdsfdfd",
                "route": "rcs"
}'`


    const phpContent = `<?php
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://rcsapi.celetel.com/v1/rcs?api_key=3d0d9925-365e-47ca-b30f-6c9a89341339',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => '{
        "to": [
            "+919876543210"
        ],
        "template_id": "qwetrtyu",
        "bot_id": "sfdsfdsfdfd",
        "route": "rcs"
    }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
));
$response = curl_exec($curl);
curl_close($curl);
echo $response;
?>`;


    return (
        <Fragment>
            <Layout>
                <main className=" w-full grid mt-4 flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-16 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card
                                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle>Today Submission</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Introducing Our Dynamic Orders Dashboard for Seamless
                                        Management and Insightful Analysis.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button>Check Today Submission</Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Week</CardDescription>
                                    <CardTitle className="text-4xl">₹10 lakhs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +55% from last week
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={25} aria-label="25% increase" />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Month</CardDescription>
                                    <CardTitle className="text-4xl">₹550 million</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +110% from last month
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={70} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="cURL">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="cURL">cURL</TabsTrigger>
                                    <TabsTrigger value="PHP">PHP</TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 gap-1 text-sm"
                                            >
                                                <ListFilter className="h-3.5 w-3.5" />
                                                <span className="sr-only sm:not-sr-only">Filter</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem checked>
                                                Fulfilled
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Declined
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Refunded
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Export</span>
                                    </Button>
                                </div>
                            </div>
                            <TabsContent value="cURL">
                                <Card value='cURL' x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Example API Request</CardTitle>
                                        <CardDescription>
                                            Determine the URL of the API endpoint you need to interact with. This is provided by the API documentation.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <pre className="whitespace-pre-wrap">{cUrl}</pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="PHP">
                                <Card x-chunk="dashboard-05-chunk-3">
                                    <CardHeader className="px-7">
                                        <CardTitle>Example API Request</CardTitle>
                                        <CardDescription>
                                            Determine the URL of the API endpoint you need to interact with. This is provided by the API documentation.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <pre className="whitespace-pre-wrap">{phpContent}</pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                        </Tabs>
                    </div>
                    <div>
                        <Card
                            className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        Bot No Oe31b70H
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Bot ID</span>
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>Date: June 2, 2024</CardDescription>
                                </div>
                                <div className="ml-auto flex items-center gap-1">
                                    <Button size="sm" variant="outline" className="h-8 gap-1">
                                        <Package2 className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Track RCS

                                        </span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                                <MoreVertical className="h-3.5 w-3.5" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                            </CardHeader>
                            <Card className="">
                                <CardHeader>
                                    <CardTitle>Send RCS Message Now</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Message</Label>
                                                <Input id="name" placeholder="Type message now" />
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="framework">Purpose</Label>
                                                <Select>
                                                    <SelectTrigger id="framework">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="next">Campaigns</SelectItem>
                                                        <SelectItem value="nuxt">Testing</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Send</Button>
                                </CardFooter>
                            </Card>

                            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                <div className="text-xs text-muted-foreground">
                                    Updated <time dateTime="2023-11-23">June 2 , 2024</time>
                                </div>
                                <Pagination className="ml-auto mr-0 w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronLeft className="h-3.5 w-3.5" />
                                                <span className="sr-only">Previous Order</span>
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronRight className="h-3.5 w-3.5" />
                                                <span className="sr-only">Next Order</span>
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </Layout>
        </Fragment>
    )
}
