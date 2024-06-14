import { getCampaignsDetailsResponse } from '@/Service/auth.service';
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export default function Campaigndetailed() {
    const { campaignId } = useParams();
    console.log(campaignId, "campaignresponse");

    const [campaignResponse, setCampaignResponse] = useState(null);

    useEffect(() => {
        const fetchCampaignResponse = async (campaignId) => {
            console.log(campaignId, "id5")
            try {
                const response = await getCampaignsDetailsResponse(campaignId);
                console.log(response, "responsecampaign");
                const details = response.find(campaign => campaign._id === campaignId);
                console.log(details, "detailsinreports");
                setCampaignResponse(details || {});
            } catch (error) {
                console.error('Error fetching campaign details:', error.message);
                setCampaignResponse({});
            }
        };

        fetchCampaignResponse();
    }, [campaignId]);


    return (
        <Fragment>
            <h1>sanu</h1>
        </Fragment>
    )
}
