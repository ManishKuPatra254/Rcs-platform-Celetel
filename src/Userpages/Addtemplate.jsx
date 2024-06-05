import { Fragment, useState } from 'react';
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
import { CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { createNewTemplates } from '@/Service/auth.service';

export default function Addtemplates() {
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    // const [cardTitle, setCardTitle] = useState('');
    // const [cardDescription, setCardDescription] = useState('');

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
                    <div className="iphone-x">
                        <i>Speaker</i>
                        <b>Camera</b>
                        <s></s>
                        <div className="inner_content">
                            <div className="inner_content_2">
                                {/* {imagePreviewUrl && (
                                                <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', borderRadius: '5px' }} />
                                            )}
                                            <h4 className="mobile-title">{cardTitle}</h4>
                                            <p className="mobile-description">{cardDescription}</p>
                                             */}
                                <p className="mobile-description">{createTemplates.textMessageContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}
