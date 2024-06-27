/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect, Fragment, useRef, useCallback } from 'react';
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getCampaignsDetails, searchCampaigns, startCampaign } from '../Service/auth.service';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { ChevronsUpDown } from "lucide-react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Helmet } from 'react-helmet';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Pagination } from '@mui/material';
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command as CommandPrimitive } from "cmdk";

const columns = [
    { id: 'createdAt', label: 'Time' },
    { id: 'templateName', label: 'Template Name' },
    { id: 'botId', label: 'Bot ID' },
    { id: 'campaignName', label: 'Campaign Name' },
    { id: 'totalNumbers', label: 'Total Numbers' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
];

const FRAMEWORKS = [
    {
        value: "Completed",
        label: "Completed",
    },
    {
        value: "Not Started",
        label: "Not Started",
    },
    {
        value: "Failed",
        label: "Failed",
    },
];


export default function RcsDetails() {
    const [campaigns, setCampaigns] = useState([]);
    const [originalCampaigns, setOriginalCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [hideBotId, setHideBotId] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [filter, setFilter] = useState("");


    console.log(sortOrder);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getCampaignsDetails(currentPage, 10);
                console.log(response, "responseforpageandlimit");
                console.log(response.currentPage, "responsepage");
                console.log(response.campaigns, "cam")
                const sortedCampaigns = response.campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCampaigns(sortedCampaigns);
                setOriginalCampaigns(sortedCampaigns);
                setTotalPages(response.totalPages || 1);
            } catch (error) {
                console.error('Error fetching campaign data:', error.message);
            }
        };

        fetchCampaigns();
    }, [currentPage]);

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedCampaigns = [...campaigns].sort((a, b) => {
            if (order === 'asc') return a.botId.localeCompare(b.botId);
            if (order === 'desc') return b.botId.localeCompare(a.botId);
            return 0;
        });
        setCampaigns(sortedCampaigns);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    const handleStartCampaign = async (campaignId) => {
        console.log(campaignId, "camp119");
        try {
            await startCampaign(campaignId);
            // Update the campaigns state with the started campaign
            setCampaigns(prevCampaigns => prevCampaigns.map(campaign => {
                if (campaign._id === campaignId) {
                    return { ...campaign, started: true };
                }
                return campaign;
            }));
            toast("Campaign started successfully");
        } catch (error) {
            console.error('Error starting campaign:', error.message);
        }
    };

    const handleViewDetails = (campaign) => {
        setSelectedCampaign(campaign);
        setDrawerOpen(true);
    };

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.campaignName.toLowerCase().includes(filter.toString().toLowerCase())
    );


    // const totalPages = Math.ceil(campaigns.length / limit);




    const downloadSummaryPDF = () => {
        if (!selectedCampaign) return;

        const doc = new jsPDF();

        doc.text("Campaign Summary", 14, 16);
        doc.autoTable({
            startY: 20,
            head: [['Field', 'Value']],
            body: [
                ['Template Name', selectedCampaign.templateName],
                ['Campaign Name', selectedCampaign.campaignName],
                ['Created At', selectedCampaign.createdAt],
                ['Updated At', selectedCampaign.updatedAt],
                ['Total Numbers', selectedCampaign.totalNumbers],
                ['Status', selectedCampaign.status],
            ],
        });

        doc.save(`${selectedCampaign.campaignName}_summary.pdf`);
    };

    const handleFilterChange = (value) => {
        setFilter(value);
        if (value === "") {
            setCampaigns(originalCampaigns);
        } else {
            const filteredCampaigns = originalCampaigns.filter(campaign =>
                campaign.campaignName.toLowerCase().includes(value.toLowerCase())
            );
            setCampaigns(filteredCampaigns);
        }
    };


    useEffect(() => {
        const searchCampaignsRcs = async () => {
            try {
                const searchResults = await searchCampaigns(filter);
                setCampaigns(searchResults);
            } catch (error) {
                console.error('Error searching campaigns:', error.message);
            }
        };

        if (filter !== "") {
            searchCampaignsRcs();
        } else {
            setCampaigns(originalCampaigns);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, originalCampaigns]);



    const inputRef = useRef(null);
    // const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([FRAMEWORKS[1]]);
    const [inputValue, setInputValue] = useState("");

    const handleUnselect = useCallback((framework) => {
        setSelected((prev) => prev.filter((s) => s.value !== framework.value));
    }, []);

    const handleKeyDown = useCallback(
        (e) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelected((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        []
    );

    const selectables = FRAMEWORKS.filter(
        (framework) => !selected.includes(framework)
    );

    console.log(selectables, selected, inputValue);

    return (
        <Fragment>
            <Layout>
                <Helmet>
                    <title> Rcs Details | RCS Celetel</title>
                </Helmet>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                        <div className="flex md:flex-row justify-between items-center mt-3 px-7">
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
                                <div className="flex flex-wrap justify-start mt-5 gap-1">
                                    <Input
                                        placeholder="Filter campaigns..."
                                        className="max-w-xs mr-4 text-xs"
                                        value={filter}
                                        onChange={(e) => handleFilterChange(e.target.value)}
                                    />
                                    <Command
                                        onKeyDown={handleKeyDown}
                                        className="overflow-visible bg-transparent w-auto mt-0"
                                    >
                                        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                            <div className="flex flex-wrap gap-1">
                                                {selected.map((framework) => {
                                                    return (
                                                        <Badge key={framework.value} variant="destructive">
                                                            {framework.label}
                                                            <button
                                                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        handleUnselect(framework);
                                                                    }
                                                                }}
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                                onClick={() => handleUnselect(framework)}
                                                            >
                                                                <X className="text-white h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                            </button>
                                                        </Badge>
                                                    );
                                                })}
                                                <CommandPrimitive.Input
                                                    ref={inputRef}
                                                    value={inputValue}
                                                    onValueChange={setInputValue}
                                                    onBlur={() => setOpen(false)}
                                                    onFocus={() => setOpen(true)}
                                                    placeholder="Select status..."
                                                    className="ml-2 py-0.5 flex-1 text-xs bg-transparent outline-none placeholder:text-muted-foreground"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative mt-2">
                                            <CommandList>
                                                {open && selectables.length > 0 ? (
                                                    <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                                        <CommandGroup className="h-full overflow-auto">
                                                            {selectables.map((framework) => {
                                                                return (
                                                                    <CommandItem
                                                                        key={framework.value}
                                                                        onMouseDown={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                        }}
                                                                        onSelect={(value) => {
                                                                            setInputValue("");
                                                                            setSelected((prev) => [...prev, framework]);
                                                                        }}
                                                                        className={"cursor-pointer"}
                                                                    >
                                                                        {framework.label}
                                                                    </CommandItem>
                                                                );
                                                            })}
                                                        </CommandGroup>
                                                    </div>
                                                ) : null}
                                            </CommandList>
                                        </div>
                                    </Command>

                                </div>
                            </div>

                            <div className="rounded-md border mt-4 overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {columns.map((column) => (
                                                column.id === 'botId' && hideBotId ? null : (
                                                    <TableCell key={column.id} className="text-center">
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
                                                                        <MenubarItem onClick={() => setHideBotId(false)}>Show</MenubarItem>
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
                                        <div className="">
                                            {console.log('Campaigns state:', campaigns)}
                                            {console.log('Filtered campaigns:', filteredCampaigns)}
                                            {/* {console.log('Displayed campaigns:', displayedCampaigns)} */}
                                        </div>
                                        {campaigns.length > 0 ? (
                                            campaigns.map((campaign) => (
                                                <TableRow key={campaign._id}>
                                                    {columns.map((column) => (
                                                        column.id === 'botId' && hideBotId ? null : (
                                                            <TableCell key={column.id} className="text-center">
                                                                {column.id === 'createdAt' ? (
                                                                    new Date(campaign[column.id]).toLocaleString()
                                                                ) : column.id === 'status' ? (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className={`ml-2 font-bold ${campaign.status === 'started' ? 'text-blue-500' : campaign.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}
                                                                    >
                                                                        {campaign[column.id]}
                                                                    </Button>
                                                                ) : column.id === 'actions' ? (
                                                                    <div className="flex space-x-2">
                                                                        <Button variant="link" onClick={() => handleViewDetails(campaign)}>
                                                                            View Details
                                                                        </Button>
                                                                        {campaign.status === 'Not Started' ? (
                                                                            <Button variant="secondary" onClick={() => handleStartCampaign(campaign._id)}>
                                                                                Start
                                                                            </Button>
                                                                        ) : null}
                                                                    </div>
                                                                ) : column.id === 'campaignName' ? (
                                                                    <span className="block w-48 truncate">{campaign[column.id]}</span>
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
                                                <TableCell colSpan={columns.length} className="text-center">
                                                    {filteredCampaigns.length === 0 ? (
                                                        <div className="flex flex-col space-y-3">
                                                            <Skeleton className="h-full w-full rounded-xl" />
                                                            <div className="space-y-2">
                                                                <Skeleton className="h-4 w-full" />
                                                                <Skeleton className="h-4 w-full" />
                                                            </div>
                                                        </div>

                                                    ) : (
                                                        <div className="flex flex-col space-y-3">
                                                            <p className="text-gray-600 font-semibold">No results found.</p>
                                                        </div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>
                                <div className="flex justify-end items-center p-3">
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {selectedCampaign && (
                    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen} className=''>
                        <SheetContent className='w-auto'>
                            <SheetHeader>
                                <SheetTitle className="text-2xl">Campaign Details</SheetTitle>
                                <SheetDescription>
                                    You can see the detail view of the campaign.
                                </SheetDescription>
                            </SheetHeader>
                            <Card className="w-auto mt-4">
                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                    <CardDescription>You can see the detail view of the campaign.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='w-auto'>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid items-center gap-4">
                                            <p className='text-sm font-semibold'>Template Name : {selectedCampaign.templateName}</p>
                                            <p className='text-sm font-semibold'>Campaign Name  : {selectedCampaign.campaignName}</p>
                                            <p className="text-sm font-semibold">Created at : {new Date(selectedCampaign.createdAt).toLocaleString()}</p>
                                            <p className="text-sm font-semibold">Updated at : {new Date(selectedCampaign.updatedAt).toLocaleString()}</p>
                                            <p className="text-sm font-semibold">Total Numbers : {selectedCampaign.totalNumbers}</p>
                                            <p className="text-sm font-semibold">Status : {selectedCampaign.status}</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between gap-2 w-auto p-4 flex-col lg:flex-row xl:flex-row md:flex-col sm:flex-col">
                                    <Button variant="outline" onClick={downloadSummaryPDF} className="w-full">Download summary (pdf)</Button>
                                    <Link to={`/reports/campaign/${selectedCampaign._id}`} className='w-full'>
                                        <Button variant="outline" className="w-full"> Individual number data</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                            <SheetFooter>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                )}
            </Layout>
        </Fragment>
    );
}
