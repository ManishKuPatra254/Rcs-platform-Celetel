import { Fragment, useEffect, useState } from "react";
import { Layout } from '@/Layout/Layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Box } from '@mui/material';
import { createCampaigns, getBots, startCampaign, uploadFileCampaigns } from "@/Service/auth.service";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, CirclePlay, Globe, Mail, PhoneCall, Plus, SendToBack } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CiBatteryFull } from "react-icons/ci";
import { FaSignal } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



export default function Createcampaign() {

    const [realtime, setRealtime] = useState(() => {
        const currentDate = new Date();
        return currentDate.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            const newTime = currentDate.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            setRealtime(newTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const [campaignCreated, setCampaignCreated] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [formData, setFormData] = useState({
        templateName: "",
        botId: "",
        campaignName: "",
        numbers: [""],
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBotName, setSelectedBotName] = useState("");



    const [getBot, setGetBot] = useState([]);

    useEffect(() => {
        const fetchBotId = async () => {
            try {
                const response = await getBots();
                console.log(response, "respponsebods");
                console.log(response.botDetails, "respponsebods");
                setGetBot(response.botDetails || []);
            } catch (error) {
                console.error('Error fetching bot data:', error.message);
            }
        };

        fetchBotId();
    }, []);

    const handleCreateCampaigns = async (e) => {
        e.preventDefault();
        try {
            const response = await createCampaigns(formData);
            console.log(response._id, "respcreate")
            if (response.success) {
                alert(response.data.message);
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
                setCampaignCreated(true);
                setCampaigns(prevCampaigns => [
                    ...prevCampaigns,
                    {
                        ...formData,
                        status: 'created',
                        _id: response._id,
                        started: false,


                    }
                ]);
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'numbers') {
            const numbersArray = value
                .split(/[\s,]+/) // Split by whitespace or comma
                .map(number => number.trim()) // Trim whitespace from each number
                .map(number => formatPhoneNumber(number));
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

    const formatPhoneNumber = (number) => {
        number = number.replace(/,/g, '');
        if (!number.startsWith('+91')) {
            return `+91${number}`;
        }
        return number;
    };


    const handleStartCampaign = async (campaignId) => {
        try {
            await startCampaign(campaignId);
            // Update the campaigns state with the started campaign
            setCampaigns(prevCampaigns => prevCampaigns.map(campaign => {
                if (campaign._id === campaignId) {
                    return { ...campaign, started: true };
                }
                return campaign;
            }));
            toast("Campaign started successfully");
        } catch (error) {
            console.error('Error starting campaign:', error.message);
        }
    };


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const response = await uploadFileCampaigns(formData);

                if (response && response.numbers) {
                    const formattedNumbers = response.numbers.map(number => {
                        return number.startsWith('+91') ? number : `+91${number}`;
                    });

                    setFormData(prevFormData => ({
                        ...prevFormData,
                        numbers: formattedNumbers
                    }));
                    toast("File uploaded successfully");
                } else {
                    toast("File uploaded, but no numbers found in response");
                }

                console.log('File uploaded successfully:', response);
            } catch (error) {
                console.error('Error uploading file:', error.message);
                toast("Error uploading file");
            }
        } else {
            toast("Please select a file to upload");
        }
    };


    const handleBotSelect = (value) => {
        const selectedBot = getBot.find(bot => bot.botId === value);
        setSelectedBotName(selectedBot ? selectedBot.botName : "");
        setFormData({ ...formData, botId: value });
    };


    return (
        <Fragment>
            <Layout>
                <Helmet>
                    <title> Create Campaigns | RCS Celetel</title>
                </Helmet>
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
                                <Select name='botId' value={formData.botId} onValueChange={handleBotSelect}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.isArray(getBot) && getBot.map((bot) => (
                                            <SelectItem key={bot.botId} value={bot.botId}>
                                                {bot.botName} - {bot.botId}
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







                                <Tabs defaultValue="uploaddata" className="w-auto">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="uploaddata">Upload File</TabsTrigger>
                                        <TabsTrigger value="writenumbers">Write Numbers Manually</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="uploaddata">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Upload Numbers</CardTitle>
                                                <CardDescription>
                                                    Upload numbers which should be Excel or CSV file and validates the phone numbers. Click on upload when youre done.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <Label htmlFor="" className="text-left">Upload Numbers</Label>
                                                <div className="flex items-center gap-4">
                                                    <Input
                                                        className=""
                                                        type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                    <Button onClick={handleFileUpload}>Upload</Button>
                                                </div>
                                            </CardContent>

                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="writenumbers">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Write numbers</CardTitle>
                                                <CardDescription>
                                                    Write numbers manually and create the campaign
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <Label htmlFor="" className="text-left">Write phone no</Label>
                                                <Textarea
                                                    name='numbers'
                                                    value={formData.numbers.join(',')}
                                                    onChange={handleCreateChange} />
                                            </CardContent>

                                        </Card>
                                    </TabsContent>
                                </Tabs>



                                <Button className='mt-4' onClick={handleCreateCampaigns}>
                                    <Plus className="mr-3 h-4 w-4" />
                                    Create
                                </Button>

                                {campaignCreated && campaigns.map(campaign => (
                                    <div key={campaign._id} className="flex justify-end py-6 gap-4">
                                        {campaign.status !== 'started' && (
                                            <Button type="button" className="px-10 bg-slate-500" onClick={() => handleStartCampaign(campaign._id)}>
                                                <CirclePlay className="mr-3 h-4 w-4" />
                                                Start Now
                                            </Button>
                                        )}
                                        <Link to={'/sendrcs'}>
                                            <Button type="button" className="bg-slate-500 px-10">
                                                <SendToBack className="mr-3 h-4 w-4" />
                                                Start later
                                            </Button>
                                        </Link>
                                    </div>
                                ))}

                            </Box>
                        </Box>
                    </div>

                    <Tabs defaultValue="conversation" className="w-auto mt-2">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="conversation">Conversation</TabsTrigger>
                            <TabsTrigger value="businessinfo">Business Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="conversation">
                            <Card className='border-2 h-[550px] overflow-auto custom-scrollbar'>
                                <div className="iphone-x">
                                    <div className="status-bar">
                                        <span className='font-semibold text-sm'>{realtime}</span>
                                        <div className="flex gap-1.5">
                                            <FaSignal className='' />
                                            <p className='font-semibold text-sm'>5G</p>
                                            <CiBatteryFull className='text-md' />
                                        </div>
                                    </div>
                                    <div className="p-2 bg-[#F5F5F5] flex gap-2  items-center">
                                        <ChevronLeft size={20} strokeWidth={2.5} color='#0079FF' cursor='pointer' />
                                        <p className='text-slate-900 text-md font-semibold'>{selectedBotName}</p>
                                    </div>
                                    <div className="inner_content">
                                        <div className="inner_content_2">
                                            <p className="text-md font-medium text-blue-900 mt-2 break-words text-ellipsis">{formData.templateName}</p>
                                            <p className="text-sm mt-2 break-words text-ellipsis">{formData.campaignName}</p>
                                            <p className="text-xs mt-2 break-words text-ellipsis">{formData.numbers.join(', ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="businessinfo">
                            <Card className='border-2 h-[550px] overflow-auto'>
                                <div className="iphone-x">
                                    <div className="status-bar">
                                        <span className='font-semibold text-sm'>{realtime}</span>
                                        <div className="flex gap-1">
                                            <FaSignal className='' />
                                            <p className='font-semibold text-sm'>5G</p>
                                            <CiBatteryFull className='text-md' />
                                        </div>
                                    </div>
                                    <div className="p-2 bg-[#F5F5F5] flex gap-2 items-center">
                                        <ChevronLeft size={20} strokeWidth={2.5} color='#0079FF' cursor='pointer' />
                                        <p className='break-words text-ellipsis font-semibold'>Info & options</p>
                                    </div>
                                    <div className="inner_content">
                                        <div className="inner_content_2">
                                            <p className='text-slate-900 text-md font-semibold'>{formData.botId}</p>
                                            <p className='text-slate-500 text-xs mt-2'>Building the future: Transforming landscapes with innovation and excellence
                                            </p>
                                            <div className="flex justify-between mt-5">
                                                <PhoneCall size={25} strokeWidth={2} cursor="pointer" />
                                                <Globe size={25} strokeWidth={2} cursor="pointer" />
                                                <Mail size={25} strokeWidth={2} cursor="pointer" />
                                            </div>
                                        </div>
                                    </div>
                                    <Tabs defaultValue="info" className="w-full p-2">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="info">Info</TabsTrigger>
                                            <TabsTrigger value="options">Options</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="info">
                                            <Card>
                                                <div className='p-4'>
                                                    <h2 className='font-bold'>Info</h2>
                                                    <CardDescription className="text-xs mt-2">
                                                        Multiple options are available here, choose any to see the details.
                                                    </CardDescription>
                                                    <div className="mt-4">
                                                        <p className='scroll-m-20 border-b pb-2 text-sm flex mt-4 gap-2 text-slate-500 font-semibold tracking-tight first:mt-0'>
                                                            <PhoneCall /> +91120499090</p>
                                                        <p className='scroll-m-20 border-b pb-2 text-sm flex mt-4 gap-2 text-slate-500 font-semibold tracking-tight first:mt-0'>
                                                            <Globe /> https://www.bhutanigroup.com/
                                                        </p>
                                                        <p className='scroll-m-20 border-b pb-2 text-sm flex mt-4 font-semibold gap-2 text-slate-500 tracking-tight first:mt-0'>
                                                            <Mail />info@bhutanigroup.com
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </TabsContent>
                                        <TabsContent value="options">
                                            <Card>
                                                <div className='p-4'>
                                                    <h2 className='font-bold'>Options</h2>
                                                    <CardDescription className="text-xs mt-2">
                                                        Multiple options are available here, choose any to see the details.
                                                    </CardDescription>
                                                    <div className="mt-4">
                                                        <p className='scroll-m-20 border-b pb-2 text-sm  mt-2 font-semibold tracking-tight first:mt-0 text-slate-500'>Notification</p>
                                                        <p className='scroll-m-20 border-b pb-2 text-sm  mt-2 font-semibold tracking-tight first:mt-0 text-slate-500'>Block & report spam
                                                        </p>
                                                        <p className='scroll-m-20 border-b pb-2 text-sm  mt-2 font-semibold tracking-tight first:mt-0 text-slate-500'>View Privacy Policy
                                                        </p>
                                                        <p className='scroll-m-20 border-b pb-2 text-sm mt-2  font-semibold tracking-tight first:mt-0 text-slate-500'>View Terms of Services
                                                        </p>
                                                        <p className='scroll-m-20 border-b pb-2 text-sm  mt-2 font-semibold tracking-tight first:mt-0 text-slate-500'>Learn more
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </Layout>
        </Fragment>
    )
}
