import { getCampaignsDetailsResponse } from '@/Service/auth.service';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

const ITEMS_PER_PAGE = 10;

export default function Campaigndetailed() {
    const { campaignId } = useParams();
    console.log(campaignId, "campaignId from useParams");

    const [campaignResponse, setCampaignResponse] = useState(null); // Use null initially to check for loaded state
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCampaignResponse = async () => {
            console.log(campaignId, "Fetching campaign details for campaignId");
            try {
                const response = await getCampaignsDetailsResponse(campaignId);
                console.log(response, "Response from getCampaignsDetailsResponse");
                const details = response.filter(campaign => campaign.campaignId === campaignId);
                console.log(details, "Details found for the given campaignId");
                setCampaignResponse(details);
            } catch (error) {
                console.error('Error fetching campaign details:', error.message);
                setCampaignResponse([]);
            }
        };

        fetchCampaignResponse();
    }, [campaignId]);

    const totalPages = campaignResponse ? Math.ceil(campaignResponse.length / ITEMS_PER_PAGE) : 0;
    const paginatedData = campaignResponse ? campaignResponse.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Fragment>
            <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                    <div className="flex md:flex-row justify-between items-center mt-3">
                        <CardTitle className='text-3xl'>
                            Campaign Details
                        </CardTitle>
                        {/* <Link to="/createcampaign">
                    <Button className=''>Create Campaign</Button>
                </Link> */}
                    </div>
                    <div className="p-6 border rounded-md overflow-auto mt-3">
                        <CardTitle className='text-2xl mb-1'>Welcome back !</CardTitle>
                        <CardDescription>
                            Here is the detailed lists of your campaigns
                        </CardDescription>
                        <div className="grid">
                            <div className="flex flex-wrap justify-start items-center mt-5 gap-1">
                                <Input
                                    placeholder="Filter numbers , campaign id..."
                                    className="max-w-xs mr-4 text-sm"
                                />
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
                                        <TableHead>Campaign ID</TableHead>
                                        <TableHead>Event Type</TableHead>
                                        <TableHead>Number</TableHead>
                                        <TableHead>Message ID</TableHead>
                                        <TableHead>Error Reason</TableHead>
                                        <TableHead>Send Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaignResponse === null ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">
                                                <div className="flex flex-col space-y-3">
                                                    <Skeleton className="h-full w-full rounded-xl" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-full" />
                                                        <Skeleton className="h-4 w-full" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedData.map((campaign) => (
                                            <TableRow key={campaign._id}>
                                                <TableCell>{campaign.campaignId}</TableCell>
                                                <TableCell>{campaign.eventType}</TableCell>
                                                <TableCell>{campaign.number}</TableCell>
                                                <TableCell>{campaign.messageId}</TableCell>
                                                <TableCell>{campaign.errorReason || "N/A"}</TableCell>
                                                <TableCell>{new Date(campaign.sendTime).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-around items-center mt-4">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage > 1) handlePageChange(currentPage - 1);
                                            }}
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            <div className='flex items-center'>
                                <Label htmlFor="page-select" className="">Go to page</Label>
                                <Select
                                    id="page-select"
                                    value={currentPage}
                                    onValueChange={(value) => handlePageChange(Number(value))}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select page" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Pages</SelectLabel>
                                            {[...Array(totalPages)].map((_, pageIndex) => (
                                                <SelectItem key={pageIndex} value={pageIndex + 1}>
                                                    {pageIndex + 1}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
