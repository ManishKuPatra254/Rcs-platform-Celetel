import { getCampaignsDetailsResponse } from '@/Service/auth.service';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
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
import { Select, SelectContent, SelectItem } from '@/components/ui/select';

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

    if (campaignResponse === null) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    if (!Array.isArray(campaignResponse)) {
        return <div>Error: Unexpected data format.</div>;
    }

    const totalPages = Math.ceil(campaignResponse.length / ITEMS_PER_PAGE);
    const paginatedData = campaignResponse.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Fragment>
            <h1>Campaign Details</h1>
            <div className="rounded-md border mt-4 overflow-auto">
                <Table>
                    <TableCaption>Details of the selected campaign.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-4 py-2">Campaign ID</TableHead>
                            <TableHead className="px-4 py-2">Event Type</TableHead>
                            <TableHead className="px-4 py-2">Number</TableHead>
                            <TableHead className="px-4 py-2">Send Time</TableHead>
                            <TableHead className="px-4 py-2">Message ID</TableHead>
                            <TableHead className="px-4 py-2">Error Reason</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((campaign) => (
                            <TableRow key={campaign._id}>
                                <TableCell className="border px-4 py-2">{campaign.campaignId}</TableCell>
                                <TableCell className="border px-4 py-2">{campaign.eventType}</TableCell>
                                <TableCell className="border px-4 py-2">{campaign.number}</TableCell>
                                <TableCell className="border px-4 py-2">{new Date(campaign.sendTime).toLocaleString()}</TableCell>
                                <TableCell className="border px-4 py-2">{campaign.messageId}</TableCell>
                                <TableCell className="border px-4 py-2">{campaign.errorReason || "N/A"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>End of campaign details</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
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
                <div>
                    <label htmlFor="page-select" className="mr-2">Go to page:</label>
                    <Select
                        id="page-select"
                        value={currentPage}
                        onChange={(e) => handlePageChange(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        <SelectContent>
                            {[...Array(totalPages)].map((_, pageIndex) => (
                                <SelectItem key={pageIndex} value={pageIndex + 1}>
                                    {pageIndex + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Fragment>
    );
}
