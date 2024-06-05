import { Fragment, useEffect, useState } from "react";
import { Layout } from '@/Layout/Layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Box } from '@mui/material';
import { CardTitle } from '@/components/ui/card';
import { createCampaigns, getBots } from "@/Service/auth.service";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


export default function Createcampaign() {
    const [formData, setFormData] = useState({
        templateName: "",
        botId: "",
        campaignName: "",
        numbers: [""],
    });
    const [getBot, setGetBot] = useState()
    useEffect(() => {
        const fetchBotId = async () => {
            try {
                const response = await getBots();
                console.log(response, "responsebotdetails");
                setGetBot(response.botIds);
            } catch (error) {
                console.error('Error fetching template data:', error.message);
            }
        };

        fetchBotId();
    }, []);


    const handleCreateCampaigns = async (e) => {
        e.preventDefault();
        try {
            const response = await createCampaigns(formData);
            if (response.success === true) {
                alert(response.data.message);
                console.log(response.data);
                setFormData({
                    templateName: "",
                    botId: "",
                    campaignName: "",
                    numbers: [""],
                });
            } else {
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                });
                toast("Campaign created successfully", {
                    description: formattedDate
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'numbers') {
            const numbersArray = value.split(',').map(number => number.trim());
            setFormData({
                ...formData,
                [name]: numbersArray,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };



    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-3 w-full lg:grid-cols-3">
                    <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2">
                        <Box sx={{
                            width: "100%",
                            '@media (max-width:1000px)': {
                                width: '100%',
                            },
                        }}>
                            <Box component="form" display="flex" flexDirection="column" gap={2} width="100%" sx={{ padding: "20px" }}>
                                <CardTitle className='text-3xl'>Create Campaign</CardTitle>

                                <Label htmlFor="botId" className="text-left">Bot Id</Label>
                                <Select name='botId' value={formData.botId} onValueChange={(value) => setFormData({ ...formData, botId: value })}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select a option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getBot && getBot.map((botId) => (
                                            <SelectItem key={botId} value={botId}>
                                                {botId}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Label htmlFor="" className="text-left">Template name</Label>
                                <Input
                                    name='templateName'
                                    value={formData.templateName}
                                    onChange={handleCreateChange} />

                                <Label htmlFor="" className="text-left">Campaign Name</Label>
                                <Input
                                    name='campaignName'
                                    value={formData.campaignName}
                                    onChange={handleCreateChange} />


                                <Label htmlFor="" className="text-left">Phone no</Label>
                                <Textarea
                                    name='numbers'
                                    type='number'
                                    value={formData.numbers.join(',')}
                                    onChange={handleCreateChange} />

                                <Button onClick={handleCreateCampaigns}>Submit</Button>
                            </Box>
                        </Box>
                    </div>
                    <div className="iphone-x">
                        <i>Speaker</i>
                        <b>Camera</b>
                        <s></s>
                        <div className="inner_content">
                            <div className="inner_content_2">
                                <p className="mobile-title">{formData.botId}</p>
                                <p className="mobile-title">{formData.templateName}</p>
                                <p className="mobile-title">{formData.campaignName}</p>
                                <p className="mobile-description">{formData.numbers.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}
