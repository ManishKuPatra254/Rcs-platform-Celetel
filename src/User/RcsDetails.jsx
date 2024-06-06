import { useState, useEffect, Fragment } from 'react';
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
// import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getCampaignsDetails, startCampaign } from '../Service/auth.service'; // Import startCampaign function
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { CircleCheck, CirclePlus, CircleX, Clock12 } from "lucide-react"

// import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Define columns for the table
const columns = [
    { id: 'templateName', label: 'Template Name' },
    { id: 'botId', label: 'Bot ID' },
    { id: 'campaignName', label: 'Campaign Name' },
    { id: 'totalNumbers', label: 'Total Numbers' },
    { id: 'actions', label: 'Actions' },
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
]

export default function RcsDetails() {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getCampaignsDetails();
                const sortedCampaigns = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCampaigns(sortedCampaigns);
            } catch (error) {
                console.error('Error fetching campaign data:', error.message);
            }
        };

        fetchCampaigns();
    }, []);

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

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                        <div className="flex md:flex-row justify-between mt-3">
                            <CardTitle className='text-3xl'>
                                Send RCS
                            </CardTitle>

                            <Link to="/createcampaign">
                                <Button className=''>Create Campaign</Button>
                            </Link>
                        </div>


                        <div className=" p-8 border rounded-md overflow-auto">
                            <CardTitle className='text-2xl mb-4'>Welcome back !</CardTitle>
                            <CardDescription>
                                Here is the list of your campaigns
                            </CardDescription>
                            <div className="flex flex-wrap gap-4 justify-between items-center">
                                <Input
                                    placeholder="Filter templates..."
                                    className="max-w-xs mt-4 mr-4"
                                />
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="flex justify-between items-center"
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
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
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
                            </div>

                            <div className="rounded-md border mt-4 overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.id}>
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {campaigns.length > 0 ? (
                                            campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
                                                <TableRow key={campaign._id}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id}>
                                                            {column.id === 'actions' ? (
                                                                <div className="text-center flex space-x-2">
                                                                    {campaign.status !== 'started' && (
                                                                        <Button onClick={() => handleStartCampaign(campaign._id)}>Start</Button>
                                                                    )}
                                                                    <Button variant="link">View Details</Button>
                                                                </div>
                                                            ) : (
                                                                campaign[column.id]
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} align="center">
                                                    {/* <Loader2 className="h-8 w-full animate-spin" /> */}
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
                            <Pagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={campaigns.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}
