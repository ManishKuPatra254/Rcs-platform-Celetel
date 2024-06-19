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
import { Helmet } from 'react-helmet';

export default function Campaigndetailed() {
    const { campaignId } = useParams();
    console.log(campaignId, "campaignId from useParams");

    const [campaignResponse, setCampaignResponse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaignResponse = async () => {
            console.log(campaignId, "Fetching campaign details for campaignId");
            try {
                setLoading(true);
                const response = await getCampaignsDetailsResponse(campaignId, currentPage, 10); // Assuming limit is 10
                console.log(response, "Response from getCampaignsDetailsResponse");
                setCampaignResponse(response.responses || []);
                setTotalPages(response.totalPages || 1);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching campaign details:', error.message);
                setCampaignResponse([]);
                setTotalPages(1);
                setLoading(false);
            }
        };

        fetchCampaignResponse();
    }, [campaignId, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Fragment>
            <Helmet>
                <title> Campaign Detailed | RCS Celetel</title>
            </Helmet>
            <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                    <div className="flex md:flex-row justify-between items-center mt-3">
                        <CardTitle className='text-3xl'>
                            Campaign Details
                        </CardTitle>
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
                                    {loading ? (
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
                                        campaignResponse.length === 0 ? (
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
                                            campaignResponse.map((campaign) => (
                                                <TableRow key={campaign._id}>
                                                    <TableCell>{campaign.campaignId}</TableCell>
                                                    <TableCell>{campaign.eventType}</TableCell>
                                                    <TableCell>{campaign.number}</TableCell>
                                                    <TableCell>{campaign.messageId}</TableCell>
                                                    <TableCell>{campaign.errorReason || "N/A"}</TableCell>
                                                    <TableCell>{new Date(campaign.sendTime).toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))
                                        )
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
