import { Layout } from '@/Layout/Layout';
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCampaignsDetails } from '@/Service/auth.service';
import { Skeleton } from '@/components/ui/skeleton';

export default function Reports() {
    const { campaignId } = useParams();
    console.log(campaignId, "campaignid");

    const [campaignDetails, setCampaignDetails] = useState(null);

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await getCampaignsDetails();
                console.log(response, "responsereports");
                const details = response.find(campaign => campaign._id === campaignId);
                console.log(details, "detailsinreports");
                setCampaignDetails(details || {});
            } catch (error) {
                console.error('Error fetching campaign details:', error.message);
                setCampaignDetails(null);
            }
        };

        fetchCampaignDetails();
    }, [campaignId]);

    if (!campaignDetails) {
        return (
            <Fragment>
                <Layout>
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-full w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                </Layout>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Layout>
                {/* <h1>Campaign Details for ID: {campaignId}</h1> */}
                <div className="bg-white rounded-md shadow-md p-4">
                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-gray-700">Campaign Name</div>
                        <div className="text-red-500 font-bold">{campaignDetails.campaignName}</div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-gray-700">Bot Name:</div>
                        <div className="font-bold">{campaignDetails.botId}</div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-gray-700">Template Name:</div>
                        <div className="font-bold">{campaignDetails.templateName}</div>
                    </div>

                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-gray-700">Total Numbers</div>
                        <div className="font-bold">{campaignDetails.totalNumbers}</div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-gray-700">Campaign Updated at</div>
                        <div className="font-bold">{campaignDetails.updatedAt}</div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-gray-700">Campaign created at</div>
                        <div className="font-bold">{campaignDetails.createdAt}</div>
                    </div>
                </div>

            </Layout>
        </Fragment>
    )
}
