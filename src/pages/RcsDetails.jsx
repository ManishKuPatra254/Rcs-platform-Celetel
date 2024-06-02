import { Fragment, useEffect, useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select } from '@mui/material';
import { createCampaigns, getCampaignsDetails } from '../Service/auth.service';
import { Layout } from '@/Layout/Layout';

export default function RcsDetails() {
    const [campaigns, setCampaigns] = useState({
        contactSource: "",
        bot: "",
        template: "",
        campaignName: "",
        customerParameter: "",
    });

    const [templates, setTemplates] = useState([]);
    const [bots, setBots] = useState([]);

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const response = await getCampaignsDetails();
                console.log(response);

                setCampaigns((prevData) => ({
                    ...prevData,
                    contactSource: response.contactSource,
                    campaignName: response.campaignName,
                    customerParameter: response.customerParameter
                }));

                setTemplates(response.templates);
                setBots(response.bots);
            } catch (error) {
                console.error('Error fetching profile data:', error.message);
            }
        };

        getCampaigns();
    }, []);

    const handleCreateCampaigns = async (e) => {
        e.preventDefault();
        try {
            const response = await createCampaigns(campaigns);
            if (response.success === true) {
                alert(response.data.message);
                console.log(response.data);
                setCampaigns({
                    contactSource: "",
                    bot: "",
                    template: "",
                    campaignName: "",
                    customerParameter: "",
                });
            } else {
                alert("Registration completed successfully");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCampaignsChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCampaigns((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-3 w-full lg:grid-cols-3">
                    <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2">
                        <Box width="100%">
                            <Box component="form" display="flex" flexDirection="column" gap={4} width="100%" sx={{ padding: "20px" }} >
                                <Typography variant="h4">
                                    Send RCS
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    name='contactSource'
                                    sx={{ background: "#ECEFFE" }}
                                    label="Contact Source"
                                    value={campaigns.contactSource}
                                    onChange={handleCampaignsChange}
                                    size='small' />

                                <FormControl variant="outlined" fullWidth size='small'>
                                    <InputLabel>Select Bot</InputLabel>
                                    <Select
                                        label="Select Bot"
                                        name='bot'
                                        value={campaigns.bot}
                                        onChange={handleCampaignsChange}
                                    >
                                        {bots.map((bot) => (
                                            <MenuItem key={bot.botId} value={bot.botId}>
                                                {bot.botId}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" fullWidth size='small'>
                                    <InputLabel>Template</InputLabel>
                                    <Select
                                        label="Template"
                                        name='template'
                                        value={campaigns.template}
                                        onChange={handleCampaignsChange}
                                    >
                                        {templates.map((template) => (
                                            <MenuItem key={template._id} value={template._id}>
                                                {template.templateName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField label="Custom Parameter"
                                    name='customerParameter'
                                    value={campaigns.customerParameter}
                                    onChange={handleCampaignsChange}
                                    variant="outlined"
                                    multiline rows={4}
                                    fullWidth size='small' />
                                <Box display="flex" gap={2}>
                                    <TextField
                                        label="Campaign Name"
                                        name='campaignName'
                                        value={campaigns.campaignName}
                                        onChange={handleCampaignsChange}
                                        variant="outlined"
                                        fullWidth size='small' />
                                    <TextField label="Total Messages" variant="outlined" fullWidth size='small' />
                                </Box>
                                <Button onClick={handleCreateCampaigns} variant="contained" sx={{
                                    mt: '10px',
                                    padding: "10px",
                                    textTransform: 'unset',
                                    fontWeight: "600",
                                    borderRadius: '8px',
                                    backgroundColor: '#000',
                                    color: "white",
                                    '&:hover': {
                                        backgroundColor: '#000',
                                        color: "white"
                                    },
                                }}>
                                    Start
                                </Button>
                            </Box>
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
