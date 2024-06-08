import { Fragment, useEffect, useState } from 'react';
import { Layout } from '@/Layout/Layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Box } from '@mui/material';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Globe, Info, Mail, PhoneCall } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { createNewTemplates } from '@/Service/auth.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CiBatteryFull } from "react-icons/ci";
import { FaSignal } from "react-icons/fa";

export default function Addtemplates() {
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    // const [cardTitle, setCardTitle] = useState('');
    // const [cardDescription, setCardDescription] = useState('');


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


    // 'text_message', 'rich_card', 'carousel'
    const [createTemplates, setCreateTemplates] = useState({
        // "userId": "",
        botId: "",
        templateName: "",
        templateType: "",
        textMessageContent: "",
        orientation: "",
        alignment: "",
        height: "",
        width: "",
        cardTitle: "",
        cardDescription: "",
        mediaUrl: "",
        thumbnailUrl: "",
        fileName: "",
        thumbnailFileName: "",
    });

    const handleCreateTemplates = async (e) => {
        e.preventDefault();
        try {
            const response = await createNewTemplates(createTemplates);
            console.log(response.data, "checkbefore")
            if (response.success === true) {
                alert(response.data.message);
                console.log(response.data, "response data");
                setCreateTemplates({
                    botId: "",
                    templateName: "",
                    templateType: "",
                    textMessageContent: "",
                    orientation: "",
                    alignment: "",
                    height: "",
                    width: "",
                    cardTitle: "",
                    cardDescription: "",
                    mediaUrl: "",
                    thumbnailUrl: "",
                    fileName: "",
                    thumbnailFileName: "",
                });
            } else {
                alert("Registration completed successfully");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // const handleImageChange = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         setSelectedImage(file);
    //         setImagePreviewUrl(URL.createObjectURL(file));
    //     }
    // };

    // const handleUrlChange = () => {
    //     // will be handling URL change logic here
    // };

    // const handleCardTitleChange = (event) => {
    //     setCardTitle(event.target.value);
    // };

    // const handleCardDescriptionChange = (event) => {
    //     setCardDescription(event.target.value);
    // };


    const handleCreateTemplateChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCreateTemplates((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTemplateTypeChange = (value) => {
        setCreateTemplates((prevData) => ({
            ...prevData,
            templateType: value,
        }));
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
                                <CardTitle className='text-3xl'>Add Templates</CardTitle>

                                <Label htmlFor="" className="text-left">Bot Id</Label>
                                <Input
                                    name='botId'
                                    value={createTemplates.botId}
                                    onChange={handleCreateTemplateChange} />

                                <Label htmlFor="" className="text-left">Template name/code</Label>
                                <Input
                                    name='templateName'
                                    value={createTemplates.templateName}
                                    onChange={handleCreateTemplateChange} />
                                {/* // 'text_message', 'rich_card', 'carousel' */}
                                <Label htmlFor="" className="text-left">Template type</Label>
                                <Select name='templateType' value={createTemplates.templateType}
                                    onValueChange={handleTemplateTypeChange}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select a option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text_message">Text</SelectItem>
                                        <SelectItem value="rich_card">Rich Card Stand Alone</SelectItem>
                                        <SelectItem value="carousel">Rich Card Carousel</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="form-group flex flex-col">
                                    <Label htmlFor="textMessageContent" className="text-left flex items-center">
                                        Message content
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span className="ml-2">
                                                        <Info size={15} className="text-slate-900 text-sm cursor-pointer" />
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>0/(2500) characters used.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    </Label>
                                    <Textarea
                                        placeholder="Message content"
                                        variant="outlined"
                                        name='textMessageContent'
                                        value={createTemplates.textMessageContent}
                                        onChange={handleCreateTemplateChange}
                                        className="mt-2 border rounded px-2 py-1"
                                    />
                                </div>
                                <Button onClick={handleCreateTemplates}>Start</Button>
                            </Box>
                        </Box>
                    </div>

                    <Tabs defaultValue="conversation" className="w-auto mt-2">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="conversation">Conversation</TabsTrigger>
                            <TabsTrigger value="businessinfo">Business Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="conversation">
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
                                    <div className="p-2 bg-[#F5F5F5] grid grid-cols-3 items-center">
                                        <ChevronLeft size={20} strokeWidth={2.5} color='#0079FF' cursor='pointer' />
                                        <p className='break-words text-ellipsis font-semibold'>{createTemplates.botId}</p>
                                    </div>
                                    {/* <i>Speaker</i>
                                    <b>Camera</b>
                                    <s></s> */}
                                    <div className="inner_content">
                                        <div className="inner_content_2">
                                            <p className='break-words text-ellipsis text-xs text-justify'>{createTemplates.textMessageContent}</p>
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
                                    {/* <i>Speaker</i>
                                    <b>Camera</b>
                                    <s></s> */}
                                    <div className="inner_content">
                                        <div className="inner_content_2">
                                            <p className='text-slate-900 text-md font-semibold'>{createTemplates.botId}</p>
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
                                                        Multiple options are avaliable here choose any to see the details.
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
                                                        Multiple options are avaliable here choose any to see the details.
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
    );
}
