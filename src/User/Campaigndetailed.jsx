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

import { ArrowRightLeft, MessageSquareWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';
import { Pagination } from '@mui/material';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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
                const response = await getCampaignsDetailsResponse(campaignId, currentPage, 10);
                console.log(response, "Response from getCampaignsDetailsResponse");
                response.responses?.map(res => console.log(res.statusLogs || [], "Response from statusLogs"));
                response.responses?.map(res =>
                    res.statusLogs?.map(log =>
                        console.log(log.eventType, "Event Type from statusLogs")
                    )
                );
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

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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
                                        <TableHead>Status</TableHead>
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
                                                    <TableCell>
                                                        {campaign.statusLogs && campaign.statusLogs.length > 0
                                                            ? campaign.statusLogs[0].eventType
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>{campaign.number}</TableCell>
                                                    <TableCell>{campaign.messageId}</TableCell>
                                                    <TableCell>{campaign.errorReason || "N/A"}</TableCell>
                                                    <TableCell>{new Date(campaign.sendTime).toLocaleString()}</TableCell>
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <Button className='text-xs mt-3' variant='link'>
                                                                <MessageSquareWarning className="mr-1 h-3 w-3" /> Check Status
                                                            </Button>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-auto">
                                                            <div className="flex flex-col items-center">
                                                                <div className="flex items-center mb-4">
                                                                    <div className=" bg-slate-300 w-6 h-6 text-center rounded-full text-slate-50 mr-2">1</div>                                                                    <div>
                                                                        <h3 className="text-sm font-bold">Sent</h3>
                                                                        <p className="text-gray-600 text-xs">Departed from country of origin</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center mb-4">
                                                                    <div className="bg-slate-300 w-6 h-6 text-center rounded-full text-slate-50 mr-2">2</div>
                                                                    <div>
                                                                        <h3 className="text-sm font-bold">Delivered</h3>
                                                                        <p className="text-gray-600 text-xs">Departed from country of origin</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center mb-4">
                                                                    <div className="bg-slate-300 w-6 h-6 text-center rounded-full text-slate-50 mr-2">3</div>
                                                                    <div>
                                                                        <h3 className="text-sm font-bold">Read</h3>
                                                                        <p className="text-gray-600 text-xs">Departed from country of origin</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>

                                                </TableRow>
                                            ))
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-end mt-4">
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
        </Fragment>
    );
}
