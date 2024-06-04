import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { createCampaigns, getCampaignsDetails } from '../Service/auth.service';
import { Layout } from '@/Layout/Layout';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardTitle } from '@/components/ui/card';

export default function RcsDetails() {
    const [campaigns, setCampaigns] = useState([]);
    const [formData, setFormData] = useState({
        botId: "",
        templateName: "",
        campaignName: "",
        // totalMessages: ""
    });

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const response = await getCampaignsDetails();
                console.log(response, "rcsdetails");
                setCampaigns(response);
            } catch (error) {
                console.error('Error fetching profile data:', error.message);
            }
        };

        getCampaigns();
    }, []);

    const handleCreateCampaigns = async (e) => {
        e.preventDefault();
        try {
            const response = await createCampaigns(formData);
            if (response.success === true) {
                alert(response.data.message);
                console.log(response.data);
                setFormData({
                    botId: "",
                    templateName: "",
                    campaignName: "",
                    // totalMessages: ""
                });
            } else {
                alert("Registration completed successfully");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-3 w-full lg:grid-cols-3">
                    <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2">
                        <Box width="100%">
                            <Box component="form" display="flex" flexDirection="column" gap={2} width="100%" sx={{ padding: "20px" }} >
                                <CardTitle className='text-3xl'>
                                    Send RCS
                                </CardTitle>
                                <Label htmlFor="botId" className="text-left">Bot Id</Label>
                                <Select name='botId' value={formData.botId} onValueChange={(value) => setFormData({ ...formData, botId: value })}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select a option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {campaigns.map((campaign) => (
                                            <SelectItem key={campaign._id} value={campaign.botId}>
                                                {campaign.botId}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Label htmlFor="templateName" className="text-left">Template Name</Label>
                                <Select name='templateName' value={formData.templateName} onValueChange={(value) => setFormData({ ...formData, templateName: value })}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select a option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {campaigns.map((campaign) => (
                                            <SelectItem key={campaign._id} value={campaign.templateName}>
                                                {campaign.templateName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>


                                <Label htmlFor="campaignName" className="text-left">Campaign Name</Label>
                                <Select name='campaignName' value={formData.campaignName} onValueChange={(value) => setFormData({ ...formData, campaignName: value })}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select a option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {campaigns.map((campaign) => (
                                            <SelectItem key={campaign._id} value={campaign.campaignName}>
                                                {campaign.campaignName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {/* <Label>Total Messages</Label>
                                <Input
                                    name='totalMessages'
                                    value={formData.totalMessages}
                                    onChange={handleFormChange} /> */}
                            </Box>
                            <Button className='w-full' onClick={handleCreateCampaigns}>
                                Start
                            </Button>
                        </Box>
                    </div>
                    <div className="mt-2">
                        <div className="iphone-x">
                            <i>Speaker</i>
                            <b>Camera</b>
                            <s></s>
                            <div className="inner_content">
                                <div className="inner_content_2">
                                    {/* {imagePreviewUrl && (
                                    <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', borderRadius: '5px' }} />
                                )} */}
                                    <h4 className="mobile-title">{ }</h4>
                                    <p className="mobile-description">{ }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}
