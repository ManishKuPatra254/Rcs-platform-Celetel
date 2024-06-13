export function InitWebSocket(setProgress) {
    const socket = new WebSocket('ws://157.15.202.251:8080');

    socket.onopen = function () {
        console.log('WebSocket connection opened');
    };

    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);

        if (data.processedCount !== undefined && data.totalNumbers !== undefined) {
            const progress = (data.processedCount / data.totalNumbers) * 100;
            console.log('Calculated progress:', progress);
            setProgress(progress);
        }
    };

    socket.onclose = function () {
        console.log('WebSocket connection closed');
    };

    socket.onerror = function (error) {
        console.error('WebSocket error:', error);
    };
}

import { useState, useEffect, Fragment } from 'react';
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getCampaignsDetails, startCampaign } from '../Service/auth.service';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft, ChevronsUpDown, CircleCheck, CirclePlus, CircleX, Clock12, X } from "lucide-react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// import { InitWebSocket } from '@/Routes/Websocket';
import { Progress } from '@/components/ui/progress';

const columns = [
    { id: 'templateName', label: 'Template Name' },
    { id: 'botId', label: 'Bot ID' },
    { id: 'campaignName', label: 'Campaign Name' },
    { id: 'totalNumbers', label: 'Total Numbers' },
    { id: 'status', label: 'Status' },
];

const frameworks = [
    {
        value: "inprogress",
        label: "In Progress",
        icon: <Clock12 className="h-4 w-4 mr-2" />
    },
    {
        value: "completed",
        label: "Completed",
        icon: <CircleCheck className="h-4 w-4 mr-2" />,
    },
    {
        value: "failed",
        label: "Failed",
        icon: <CircleX className="h-4 w-4 mr-2" />,
    },
];

export default function RcsDetails() {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [hideBotId, setHideBotId] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        console.log("Initializing WebSocket...");
        InitWebSocket(setProgress);
    }, []);

    useEffect(() => {
        console.log("Progress updated:", progress);
    }, [progress]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getCampaignsDetails();
                console.log(response.campaigns, "cam");
                const sortedCampaigns = response.campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCampaigns(sortedCampaigns);
            } catch (error) {
                console.error('Error fetching campaign data:', error.message);
            }
        };

        fetchCampaigns();
    }, []);

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedCampaigns = [...campaigns].sort((a, b) => {
            if (order === 'asc') return a.botId.localeCompare(b.botId);
            if (order === 'desc') return b.botId.localeCompare(a.botId);
            return 0;
        });
        setCampaigns(sortedCampaigns);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleStartCampaign = async (campaignId) => {
        try {
            await startCampaign(campaignId);
            const updatedCampaigns = campaigns.map(campaign =>
                campaign._id === campaignId ? { ...campaign, status: 'started' } : campaign
            );
            setCampaigns(updatedCampaigns);
            toast("Campaign started successfully");
        } catch (error) {
            console.error('Error starting campaign:', error.message);
        }
    };

    const handleViewDetails = (campaign) => {
        setSelectedCampaign(campaign);
        setDrawerOpen(true);
    };

    const totalPages = Math.ceil(campaigns.length / rowsPerPage);

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                        <div className="flex md:flex-row justify-between items-center mt-3">
                            <CardTitle className='text-3xl'>
                                Send RCS
                            </CardTitle>

                            <Link to="/createcampaign">
                                <Button className=''>Create Campaign</Button>
                            </Link>
                        </div>

                        <div className="p-6 border rounded-md overflow-auto">
                            <CardTitle className='text-2xl mb-1'>Welcome back !</CardTitle>
                            <CardDescription>
                                Here is the list of your campaigns
                            </CardDescription>
                            <div className="grid">
                                <div className="flex flex-wrap justify-start items-center mt-5 gap-1">
                                    <Input
                                        placeholder="Filter campaigns..."
                                        className="max-w-xs mr-4 text-sm"
                                    />
                                    <Popover open={open} onOpenChange={setOpen} className="mt-4">
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="flex justify-between items-center px-4 py-0 text-xs"
                                            >
                                                {value ? (
                                                    <Fragment>
                                                        {frameworks.find((framework) => framework.value === value)?.icon}
                                                        <span className="ml-2">
                                                            {frameworks.find((framework) => framework.value === value)?.label}
                                                        </span>
                                                    </Fragment>
                                                ) : (
                                                    <span>Status</span>
                                                )}
                                                <CirclePlus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Status" />
                                                <CommandList>
                                                    <CommandEmpty>No templates found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {frameworks.map((framework) => (
                                                            <CommandItem
                                                                key={framework.value}
                                                                value={framework.value}
                                                                onSelect={(currentValue) => {
                                                                    setValue(currentValue === value ? "" : currentValue);
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                {framework.icon}
                                                                {framework.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="mt-4 ml-2 flex justify-between items-center px-4 py-0 text-xs">
                                                Columns <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-4">
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <Label htmlFor="showBotId" className="text-sm">
                                                        Show Bot ID
                                                    </Label>
                                                    <input
                                                        type="checkbox"
                                                        id="showBotId"
                                                        checked={!hideBotId}
                                                        onChange={() => setHideBotId(!hideBotId)}
                                                        className="form-checkbox"
                                                    />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="mt-4 ml-2 flex justify-between items-center px-4 py-0 text-xs">
                                                Sort <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-4">
                                            <div className="flex flex-col space-y-2">
                                                <div
                                                    className="flex justify-between items-center cursor-pointer"
                                                    onClick={() => handleSort('asc')}
                                                >
                                                    <span className="text-sm">Sort by Bot ID (Asc)</span>
                                                </div>
                                                <div
                                                    className="flex justify-between items-center cursor-pointer"
                                                    onClick={() => handleSort('desc')}
                                                >
                                                    <span className="text-sm">Sort by Bot ID (Desc)</span>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="relative overflow-auto mt-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                                <TableCell className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
                                                <TableRow key={campaign._id}>
                                                    <TableCell className="text-sm text-gray-900">{campaign.templateName}</TableCell>
                                                    <TableCell className="text-sm text-gray-900">{hideBotId ? '****' : campaign.botId}</TableCell>
                                                    <TableCell className="text-sm text-gray-900">{campaign.campaignName}</TableCell>
                                                    <TableCell className="text-sm text-gray-900">{campaign.totalNumbers}</TableCell>
                                                    <TableCell className="text-sm text-gray-900">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className={`ml-2 ${campaign.status === 'inprogress' ? 'text-blue-500' : campaign.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}
                                                        >
                                                            {campaign.status}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-gray-900">
                                                        <Button onClick={() => handleStartCampaign(campaign._id)} className="mr-2" variant="outline" size="sm">
                                                            Start
                                                        </Button>
                                                        <Button onClick={() => handleViewDetails(campaign)} variant="outline" size="sm">
                                                            View
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <Pagination>
                                            <PaginationPrevious
                                                disabled={page === 0}
                                                onClick={() => handleChangePage(page - 1)}
                                            >
                                                Previous
                                            </PaginationPrevious>
                                            <PaginationContent>
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <PaginationItem key={index}>
                                                        <PaginationLink
                                                            active={page === index}
                                                            onClick={() => handleChangePage(index)}
                                                        >
                                                            {index + 1}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                            </PaginationContent>
                                            <PaginationNext
                                                disabled={page === totalPages - 1}
                                                onClick={() => handleChangePage(page + 1)}
                                            >
                                                Next
                                            </PaginationNext>
                                        </Pagination>
                                    </div>

                                    <div>
                                        <select
                                            value={rowsPerPage}
                                            onChange={handleChangeRowsPerPage}
                                            className="form-select mt-1 block w-full"
                                        >
                                            {[10, 20, 30].map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid auto-rows-max items-start gap-4 lg:col-span-4 lg:w-full sm:w-full">
                        <div className="p-6 border rounded-md overflow-auto">
                            <CardTitle className='text-2xl mb-1'>Campaign Progress</CardTitle>
                            <Progress value={progress} className="mt-2" />
                            <p className="mt-2 text-sm text-gray-600">Progress: {progress.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            </Layout>

            {/* <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Campaign Details</DrawerTitle>
                        <DrawerDescription>
                            View the details of your selected campaign.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        {selectedCampaign && (
                            <div>
                                <p className="text-sm">Template Name: {selectedCampaign.templateName}</p>
                                <p className="text-sm">Bot ID: {selectedCampaign.botId}</p>
                                <p className="text-sm">Campaign Name: {selectedCampaign.campaignName}</p>
                                <p className="text-sm">Total Numbers: {selectedCampaign.totalNumbers}</p>
                                <p className="text-sm">Status: {selectedCampaign.status}</p>
                            </div>
                        )}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={() => setDrawerOpen(false)} variant="outline">
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer> */}
        </Fragment>
    );
}
