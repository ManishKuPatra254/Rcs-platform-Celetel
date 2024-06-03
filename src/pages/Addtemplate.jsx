import { Fragment, useState } from 'react';
// import { Box, TextField, MenuItem, Typography, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, Tooltip } from '@mui/material';
import { Layout } from '@/Layout/Layout';
// import { createNewTemplates } from '@/Service/auth.service';
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
import { Box, Typography } from '@mui/material';

export default function Addtemplates() {
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    // const [cardTitle, setCardTitle] = useState('');
    // const [cardDescription, setCardDescription] = useState('');

    // 'text_message', 'rich_card', 'carousel'
    const [createTemplates, SetCreateTemplates] = useState({
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

    // const handleCreateTemplates = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await createNewTemplates(createTemplates);
    //         if (response.success === true) {
    //             alert(response.data.message);
    //             console.log(response.data);
    //             SetCreateTemplates({
    //                 botId: "",
    //                 templateName: "",
    //                 templateType: "",
    //                 textMessageContent: "",
    //                 orientation: "",
    //                 alignment: "",
    //                 height: "",
    //                 width: "",
    //                 cardTitle: "",
    //                 cardDescription: "",
    //                 mediaUrl: "",
    //                 thumbnailUrl: "",
    //                 fileName: "",
    //                 thumbnailFileName: "",
    //             });
    //         } else {
    //             alert("Registration completed successfully");
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

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
        const { name, value } = e.target;
        SetCreateTemplates((prevData) => ({
            ...prevData,
            [name]: value,
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
                                <Typography variant="h4">
                                    Add Templates
                                </Typography>
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
                                <Select>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Text" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text_message">Text</SelectItem>
                                        <SelectItem value="rich_card">Rich Card Stand Alone</SelectItem>
                                        <SelectItem value="carousel">Rich Card Carousel</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Label htmlFor="" className="text-left">Message content</Label>
                                <Textarea
                                    placeholder="Message content"
                                    variant="outlined"
                                    name='textMessageContent'
                                    value={createTemplates.textMessageContent}
                                    onChange={handleCreateTemplateChange} />
                                <Button>Start</Button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}
