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
import { ChevronLeft, Globe, Info, Mail, PhoneCall } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { createNewTemplates, getBots } from '@/Service/auth.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CiBatteryFull } from "react-icons/ci";
import { FaPlus, FaSignal } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { toast } from 'sonner';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export default function Addtemplates() {
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

    const [accTemptype, setAccTemptype] = useState('');
    const [createTemplates, setCreateTemplates] = useState({
        botId: "",
        name: "",
        type: "",
        textMessageContent: "",
        orientation: "",
        height: "",
        width: "",
        cardTitle: "",
        cardDescription: "",
        mediaUrl: "",
        thumbnailUrl: "",
        carouselList: [
            {
                cardTitle: "",
                cardDescription: "",
                mediaUrl: "",
                thumbnailUrl: "",
            }
        ]
    });

    const handleCreateTemplates = async (e) => {
        e.preventDefault();
        try {
            let payload = { ...createTemplates };

            if (accTemptype === 'text_message') {
                delete payload.cardTitle;
                delete payload.cardDescription;
                delete payload.mediaUrl;
                delete payload.thumbnailUrl;
                delete payload.orientation;
                delete payload.alignment;
                delete payload.height;
                delete payload.width;
            }
            else if (accTemptype === 'rich_card') {
                delete payload.textMessageContent;
                delete payload.width;
                delete payload.mediaUrl;
                delete payload.carouselList;

            }
            else if (accTemptype === 'carousel') {
                delete payload.textMessageContent;
                delete payload.orientation;
                delete payload.alignment;
            }

            const response = await createNewTemplates(payload);
            console.log(response.data, "checkbefore")
            if (response.success === true) {
                alert(response.data.message);
                console.log(response.data, "response data");
                setCreateTemplates({
                    botId: "",
                    name: "",
                    type: "",
                    textMessageContent: "",
                    orientation: "",
                    height: "",
                    width: "",
                    cardTitle: "",
                    cardDescription: "",
                    mediaUrl: "",
                    thumbnailUrl: "",
                    carouselList: [
                        {
                            cardTitle: "",
                            cardDescription: "",
                            mediaUrl: "",
                            thumbnailUrl: "",
                        }
                    ]
                });
            } else {
                toast("Template created successfully");
            }
        } catch (error) {
            console.log(error.message);
        }
    };



    const [getAllBots, setGetAllBots] = useState();

    useEffect(() => {
        const fetchBotIdsToTemp = async () => {
            try {
                const response = await getBots();
                setGetAllBots(response.botIds);
            } catch (error) {
                console.error('Error fetching bot data:', error.message);
            }
        };

        fetchBotIdsToTemp();
    }, []);


    const handleCreateTemplateChange = (e) => {
        const { name, value } = e.target;
        setCreateTemplates((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleTemplateTypeChange = (value) => {
        setCreateTemplates((prevData) => ({
            ...prevData,
            type: value,
        }));
        setAccTemptype(value);
    };

    const handleFieldChange = (field, value) => {
        setCreateTemplates((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleFieldChangeCarousel = (field, value) => {
        setCreateTemplates((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setCreateTemplates((prevData) => ({
                    ...prevData,
                    thumbnailUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        const { thumbnailUrl } = createTemplates;
        if (thumbnailUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            setImagePreview(thumbnailUrl);
        } else {
            setImagePreview('');
        }
    };


    const [cards, setCards] = useState([1, 2]);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleAddCard = () => {
        if (cards.length < 10) {
            setCards([...cards, cards.length + 1]);
        }
    };

    const handleSelectedCard = (card) => {
        setSelectedCard(card);
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
                                <Select name='botId' value={createTemplates.botId} onValueChange={(value) => setCreateTemplates({ ...createTemplates, botId: value })}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getAllBots && getAllBots.map((botId) => (
                                            <SelectItem key={botId} value={botId}>
                                                {botId}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Label htmlFor="" className="text-left">Template name/code</Label>
                                <Input
                                    name='name'
                                    value={createTemplates.name}
                                    onChange={handleCreateTemplateChange} />

                                <Label htmlFor="" className="text-left">Template type</Label>
                                <Select name='type' value={createTemplates.type}
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

                                {/* text_message .................................................................. */}


                                {accTemptype === 'text_message' && (
                                    <Fragment>
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
                                    </Fragment>
                                )}


                                {/* rich card ................................................................*/}


                                {accTemptype === 'rich_card' && (
                                    <Fragment>

                                        <Label htmlFor="" className="text-left">Orientation</Label>
                                        <Select name="orientation" onValueChange={(value) => handleFieldChange('orientation', value)}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select Orientation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="VERTICAL">Vertical</SelectItem>
                                                <SelectItem value="HORIZONTAL">Horizontal</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {createTemplates.orientation === 'HORIZONTAL' && (
                                            <Fragment>
                                                <Label htmlFor="" className="text-left">Alignment</Label>
                                                <Select name="height" onValueChange={(value) => handleFieldChange('height', value)}>
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Select Alignment" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="LEFT">Left</SelectItem>
                                                        <SelectItem value="RIGHT">Right</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Fragment>
                                        )}
                                        {createTemplates.orientation === 'VERTICAL' && (
                                            <Fragment>
                                                <Label htmlFor="" className="text-left">Height</Label>
                                                <Select name="height" onValueChange={(value) => handleFieldChange('height', value)}>
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Select height" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SHORT_HEIGHT">Short Height</SelectItem>
                                                        <SelectItem value="MEDIUM_HEIGHT">Medium Height</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Fragment>
                                        )}

                                        <Label htmlFor="" className="text-left">Image/Video</Label>
                                        <div className="flex items-center gap-4">
                                            <Input className=""
                                                type="file"
                                                name="thumbnailUrl"
                                                onChange={handleImageChange}
                                                accept="image/*" />
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button>Upload</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[825px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Select an Image/Video Url</DialogTitle>
                                                        <DialogDescription>
                                                            Select an Image/Video and click upload when youre done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid">

                                                        <Tabs defaultValue="upload" className="w-full">
                                                            <TabsList className="grid w-full grid-cols-3">
                                                                <TabsTrigger value="upload">Upload</TabsTrigger>
                                                                <TabsTrigger value="uploadurl">Upload from URL</TabsTrigger>
                                                                <TabsTrigger value="uploadimagevideo">Variable Image/Video URL</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="upload">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>Upload Image</CardTitle>
                                                                        <CardDescription className="text-xs mt-2">
                                                                            The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF. If the image you select doesn’t meet these requirements, you’ll have the opportunity to edit it. If you are uploading a video, the max file size is 10MB.
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent className="space-y-2">

                                                                    </CardContent>
                                                                    <CardFooter className="flex w-full justify-end">
                                                                        <Button>Upload</Button>
                                                                    </CardFooter>
                                                                </Card>
                                                            </TabsContent>



                                                            <TabsContent value="uploadurl">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>Upload from Url</CardTitle>
                                                                        <CardDescription className="text-xs mt-2">
                                                                            The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF, and be located at a publicly available URL. If the image you upload doesn’t meet these requirements, you’ll have the opportunity to edit it. If you are uploading a video, the max file size is 10MB.
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent className="space-y-2">
                                                                        <div className="space-y-1">
                                                                            <Label htmlFor="new">Upload the image url</Label>
                                                                            <Input type="url" name="thumbnailUrl" value={createTemplates.thumbnailUrl} onChange={handleCreateTemplateChange} className="mt-2" />
                                                                        </div>
                                                                    </CardContent>
                                                                    <CardFooter className="flex w-full justify-end">
                                                                        <Button onClick={handleUploadClick}>Upload</Button>
                                                                    </CardFooter>
                                                                </Card>
                                                            </TabsContent>

                                                            <TabsContent value="uploadimagevideo">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>Upload Image / Video</CardTitle>
                                                                        <CardDescription className="text-xs mt-2">
                                                                            The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF.The image must be publicly available after the variable is replaced at run-time. If the image you upload doesn’t meet these requirements, it may appear cropped or distorted. If you are uploading a video, the max file size is 10MB..
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent className="space-y-2">
                                                                        <div className="space-y-1">
                                                                            <Label htmlFor="new">Upload the image/video url</Label>
                                                                            <Input type="url" className="mt-2" name="mediaUrl" value={createTemplates.mediaUrl} onChange={handleCreateTemplateChange} />
                                                                        </div>
                                                                    </CardContent>
                                                                    <CardFooter className="flex w-full justify-end">
                                                                        <Button>Upload</Button>
                                                                    </CardFooter>
                                                                </Card>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>

                                                </DialogContent>
                                            </Dialog>
                                        </div>



                                        <Label htmlFor="" className="text-left">Card Title</Label>
                                        <Input type="text" name="cardTitle" value={createTemplates.cardTitle} onChange={handleCreateTemplateChange} />


                                        <Label htmlFor="" className="text-left">Card Description</Label>
                                        <Textarea name="cardDescription" value={createTemplates.cardDescription} onChange={handleCreateTemplateChange}></Textarea>
                                    </Fragment>
                                )}


                                {/* carosel ....................................................................... */}

                                {accTemptype === "carousel" && (
                                    <Fragment>

                                        <div className="flex flex-wrap gap-4 p-4">
                                            {cards.map((card, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-200 border border-gray-300 rounded p-4 min-w-[100px] text-sm text-center shadow cursor-pointer"
                                                    onClick={() => handleSelectedCard(card)}
                                                >
                                                    Card {card}
                                                </div>
                                            ))}
                                            {cards.length < 10 && (
                                                <div
                                                    className="flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded p-4 min-w-[100px] cursor-pointer shadow transition hover:bg-gray-100"
                                                    onClick={handleAddCard}
                                                >
                                                    <FaPlus size={15} />
                                                </div>
                                            )}
                                        </div>


                                        <Fragment>
                                            <Label htmlFor="" className="text-left">Height</Label>
                                            <Select name="height" onValueChange={(value) => handleFieldChangeCarousel('height', value)}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select height" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SHORT_HEIGHT">Short Height</SelectItem>
                                                    <SelectItem value="MEDIUM_HEIGHT">Medium Height</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </Fragment>


                                        <Label htmlFor="" className="text-left">Width</Label>
                                        <Select name="width" onValueChange={(value) => handleFieldChange('width', value)}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select width" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="SHORT_WIDTH">Short Width</SelectItem>
                                                <SelectItem value="MEDIUM_WIDTH">Medium Width</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Label htmlFor="" className="text-left">Image/Video</Label>
                                        <div className="flex items-center gap-4">
                                            <Input className="" type="file" />
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button>Upload</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[825px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Select an Image/Video Url</DialogTitle>
                                                        <DialogDescription>
                                                            Select an Image/Video and click upload when youre done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid">

                                                        <Tabs defaultValue="upload" className="w-full">
                                                            <TabsList className="grid w-full grid-cols-3">
                                                                <TabsTrigger value="upload">Upload</TabsTrigger>
                                                                <TabsTrigger value="uploadurl">Upload from URL</TabsTrigger>
                                                                <TabsTrigger value="uploadimagevideo">Variable Image/Video URL</TabsTrigger>
                                                            </TabsList>
                                                            <TabsContent value="upload">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>Upload Image</CardTitle>
                                                                        <CardDescription className="text-xs mt-2">
                                                                            The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF. If the image you select doesn’t meet these requirements, you’ll have the opportunity to edit it. If you are uploading a video, the max file size is 10MB.
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent className="space-y-2">

                                                                    </CardContent>
                                                                    <CardFooter className="flex w-full justify-end">
                                                                        <Button>Upload</Button>
                                                                    </CardFooter>
                                                                </Card>
                                                            </TabsContent>



                                                            <TabsContent value="uploadurl">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>Upload from Url</CardTitle>
                                                                        <CardDescription className="text-xs mt-2">
                                                                            The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF, and be located at a publicly available URL. If the image you upload doesn’t meet these requirements, you’ll have the opportunity to edit it. If you are uploading a video, the max file size is 10MB.
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent className="space-y-2">
                                                                        <div className="space-y-1">
                                                                            <Label htmlFor="new">Upload the image url</Label>
                                                                            <Input type="url" name="thumbnailUrl" value={createTemplates.thumbnailUrl} onChange={handleCreateTemplateChange} className="mt-2" />
                                                                        </div>
                                                                    </CardContent>
                                                                    <CardFooter className="flex w-full justify-end">
                                                                        <Button>Upload</Button>
                                                                    </CardFooter>
                                                                </Card>
                                                            </TabsContent>

                                                            <TabsContent value="uploadimagevideo">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>Upload Image / Video</CardTitle>
                                                                        <CardDescription className="text-xs mt-2">
                                                                            The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF.The image must be publicly available after the variable is replaced at run-time. If the image you upload doesn’t meet these requirements, it may appear cropped or distorted. If you are uploading a video, the max file size is 10MB..
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent className="space-y-2">
                                                                        <div className="space-y-1">
                                                                            <Label htmlFor="new">Upload the image/video url</Label>
                                                                            <Input type="url" className="mt-2" name="mediaUrl" value={createTemplates.mediaUrl} onChange={handleCreateTemplateChange} />
                                                                        </div>
                                                                    </CardContent>
                                                                    <CardFooter className="flex w-full justify-end">
                                                                        <Button>Upload</Button>
                                                                    </CardFooter>
                                                                </Card>
                                                            </TabsContent>
                                                        </Tabs>
                                                    </div>

                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        <Label htmlFor="" className="text-left">Card Title</Label>
                                        <Input type="text" name="cardTitle" value={createTemplates.carouselList.cardTitle} onChange={handleCreateTemplateChange} />


                                        <Label htmlFor="" className="text-left">Card Description</Label>
                                        <Textarea name="cardDescription" value={createTemplates.cardDescription} onChange={handleCreateTemplateChange}></Textarea>
                                    </Fragment>
                                )}



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
                            <Card className='border-2 h-[550px] overflow-auto custom-scrollbar'>
                                <div className="iphone-x">
                                    <div className="status-bar">
                                        <span className='font-semibold text-sm'>{realtime}</span>
                                        <div className="flex gap-1">
                                            <FaSignal className='' />
                                            <p className='font-semibold text-sm'>5G</p>
                                            <CiBatteryFull className='text-md' />
                                        </div>
                                    </div>
                                    <div className="p-2 bg-[#F5F5F5] flex gap-2  items-center">
                                        <ChevronLeft size={20} strokeWidth={2.5} color='#0079FF' cursor='pointer' />
                                        <p className='break-words text-ellipsis font-semibold'>{createTemplates.botId}</p>
                                    </div>
                                    <div className="inner_content">
                                        <div className="inner_content_2">
                                            {selectedCard !== null && (
                                                <div className="p-4">
                                                    <Carousel className="w-full max-w-xs">
                                                        <CarouselContent>
                                                            {cards.map((card, index) => (
                                                                <CarouselItem key={index}>
                                                                    <div className="p-1">
                                                                        <Card>
                                                                            <CardContent className="flex aspect-auto items-center justify-center p-6">
                                                                                <span className="text-sm font-semibold">{card}</span>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                </CarouselItem>
                                                            ))}
                                                        </CarouselContent>
                                                        <CarouselPrevious className="border text-black" />
                                                        <CarouselNext className="text-black" />
                                                    </Carousel>
                                                </div>
                                            )}
                                            <img src={imagePreview} alt="" />
                                            <p className='break-words text-sm font-semibold text-ellipsis text-justify'>{createTemplates.cardTitle}</p>
                                            <p className='break-words mt-2 text-gray-500 text-ellipsis text-xs text-justify'>{createTemplates.cardDescription}</p>
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
    );
}
