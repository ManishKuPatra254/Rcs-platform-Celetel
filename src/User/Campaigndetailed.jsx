import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
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
import { Input } from '@/components/ui/input';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';
import { Pagination } from '@mui/material';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";

const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
];

export default function Campaigndetailed() {
    const { campaignId } = useParams();
    const [campaignResponse, setCampaignResponse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        const fetchCampaignResponse = async () => {
            try {
                setLoading(true);
                const response = await getCampaignsDetailsResponse(campaignId, currentPage, 10);
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

    const getLatestEventType = (statusLogs) => {
        if (statusLogs && statusLogs.length > 0) {
            return statusLogs[statusLogs.length - 1].eventType;
        }
        return "Message sent successfully";
    };

    useEffect(() => {
        if (campaignResponse.length > 0) {
            // Automatically move to the next step if status logs are present
            if (campaignResponse[0].statusLogs.length > 0) {
                setActiveStep(steps.length); // Set active step to the last step
            }
        }
    }, [campaignResponse]);

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
                                                    <TableCell>{getLatestEventType(campaign.statusLogs)}</TableCell>
                                                    <TableCell className="truncate">{campaign.number}</TableCell>
                                                    <TableCell>{campaign.messageId}</TableCell>
                                                    <TableCell>{campaign.errorReason || "N/A"}</TableCell>
                                                    <TableCell>{new Date(campaign.sendTime).toLocaleString()}</TableCell>

                                                    <Sheet>
                                                        <SheetTrigger asChild>
                                                            <Button className='text-xs mt-2' variant='link'>
                                                                <MessageSquareWarning className="mr-1 h-3 w-3" /> Check Status
                                                            </Button>
                                                        </SheetTrigger>
                                                        <SheetContent>
                                                            <SheetHeader>
                                                                <SheetTitle>Check Status</SheetTitle>
                                                                <SheetDescription className='text-xs'>
                                                                    Check the status here
                                                                </SheetDescription>
                                                                <Separator />
                                                            </SheetHeader>

                                                            <Stepper activeStep={activeStep} orientation="vertical">
                                                                {campaign.statusLogs.map((log) => (
                                                                    <Step key={log._id}>
                                                                        <StepLabel>{log.eventType}
                                                                            <p className="text-gray-600 text-xs truncate">{log.details}</p>
                                                                        </StepLabel>
                                                                    </Step>
                                                                ))}
                                                            </Stepper>

                                                            {/* <div className="flex flex-col items-start justify-start mt-8">
                                                                {campaign.statusLogs.map((log, index) => (
                                                                    <div key={log._id} className="flex items-center mb-4">
                                                                        <div className="bg-slate-300 w-6 h-6 text-center rounded-full text-slate-50 mr-2">{index + 1}</div>
                                                                        <div>
                                                                            <h3 className="text-sm font-bold">{log.eventType}</h3>
                                                                            <p className="text-gray-600 text-xs truncate">{log.details}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div> */}
                                                            <SheetFooter>
                                                                <SheetClose asChild>
                                                                    <Button type="submit" className='text-xs'>Close</Button>
                                                                </SheetClose>
                                                            </SheetFooter>
                                                        </SheetContent>
                                                    </Sheet>

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
