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
import { ArrowRightLeft, ChevronsUpDown, CircleCheck, CirclePlus, CircleX, Clock12 } from "lucide-react";
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
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { InitWebSocket } from '@/Routes/Websocket';
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
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        InitWebSocket(setProgress);
    }, [])

    console.log(sortOrder);

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

    console.log(handleChangeRowsPerPage)

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

    console.log(handleStartCampaign);

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
                                                                }}>
                                                                {framework.icon}
                                                                <span className="ml-2">{framework.label}</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <Button
                                        variant="outline"
                                        className="ml-auto text-xs bg-transparent">
                                        <ArrowRightLeft className='h-4 w-4 mr-3' />
                                        View
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-md border mt-4 overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {columns.map((column) => (
                                                column.id === 'botId' && hideBotId ? null : (
                                                    <TableCell key={column.id}>
                                                        {column.label === 'Bot ID' ? (
                                                            <Menubar className="bg-transparent border-transparent">
                                                                <MenubarMenu>
                                                                    <MenubarTrigger className='flex gap-4 cursor-pointer'>
                                                                        {column.label}
                                                                        <ChevronsUpDown className='h-4 w-4 text-gray-400' />
                                                                    </MenubarTrigger>
                                                                    <MenubarContent>
                                                                        <MenubarItem onClick={() => handleSort('asc')}>Ascending</MenubarItem>
                                                                        <MenubarItem onClick={() => handleSort('desc')}>Descending</MenubarItem>
                                                                        <MenubarItem onClick={() => setHideBotId(true)}>Hide</MenubarItem>
                                                                    </MenubarContent>
                                                                </MenubarMenu>
                                                            </Menubar>
                                                        ) : (
                                                            column.label
                                                        )}
                                                    </TableCell>
                                                )
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {campaigns.length > 0 ? (
                                            campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
                                                <TableRow key={campaign._id}>
                                                    {columns.map((column) => (
                                                        column.id === 'botId' && hideBotId ? null : (
                                                            <TableCell key={column.id}>
                                                                {column.id === 'status' ? (
                                                                    <div className="text-center flex space-x-2">
                                                                        {campaign.status !== 'started' && (
                                                                            <Button variant="ghost"
                                                                            // onClick={() => handleStartCampaign(campaign._id)}
                                                                            >{campaign.status}</Button>
                                                                        )}
                                                                        <Button variant="outline" onClick={() => handleViewDetails(campaign)}>
                                                                            View Details
                                                                        </Button>

                                                                        <div>
                                                                            <Progress value={progress} className="" />
                                                                            <Button variant="ghost">{progress}%</Button>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    column.id === 'campaignName' ? (
                                                                        <span className="block w-48 truncate">{campaign[column.id]}</span>
                                                                    ) : (
                                                                        campaign[column.id]
                                                                    ))}
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

                            <Pagination className='mt-5 '>
                                <PaginationContent className='cursor-pointer'>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handleChangePage(page > 0 ? page - 1 : 0)}
                                            disabled={page === 0}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                isActive={index === page}
                                                onClick={() => handleChangePage(index)}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    {totalPages > 5 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handleChangePage(page < totalPages - 1 ? page + 1 : totalPages - 1)}
                                            disabled={page >= totalPages - 1}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>

                {selectedCampaign && (
                    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="text-2xl">Campaign Details</SheetTitle>
                                <SheetDescription>
                                    You can see the detail view of the campaign.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid items-center gap-4">
                                    <p className='text-sm font-semibold'>Template Name : {selectedCampaign.templateName}</p>
                                    <p className='text-sm font-semibold'>Campaign Name  : {selectedCampaign.campaignName}</p>
                                    <p className="text-sm font-semibold">Created at : {selectedCampaign.createdAt}</p>
                                    <p className="text-sm font-semibold">Updated at : {selectedCampaign.updatedAt}</p>
                                    <p className="text-sm font-semibold">Total Numbers : {selectedCampaign.totalNumbers}</p>
                                    <p className="text-sm font-semibold">Status : {selectedCampaign.status}</p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">

                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant="outline" className="ml-auto">Download summary (pdf)</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                )}
            </Layout>
        </Fragment>
    );
}