import { Fragment, useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, Tooltip } from '@mui/material';
import { Layout } from '@/Layout/Layout';
import { createNewTemplates } from '@/Service/auth.service';

export default function Addtemplates() {
    const [templateType, setTemplateType] = useState('');
    const [cardOrientation, setCardOrientation] = useState('');
    const [mediaHeight, setMediaHeight] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');

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

    const handleCreateTemplates = async (e) => {
        e.preventDefault();
        try {
            const response = await createNewTemplates(createTemplates);
            if (response.success === true) {
                alert(response.data.message);
                console.log(response.data);
                SetCreateTemplates({
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


    const handleCardOrientationChange = (event) => {
        setCardOrientation(event.target.value);
    };

    const handleMediaHeightChange = (event) => {
        setMediaHeight(event.target.value);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
        setOpen(false);
    };

    const handleUrlChange = () => {
        // will be handling URL change logic here
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCardTitleChange = (event) => {
        setCardTitle(event.target.value);
    };

    const handleCardDescriptionChange = (event) => {
        setCardDescription(event.target.value);
    };


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

                                <TextField size="small"
                                    label="Bot Id"
                                    variant="outlined"
                                    name='botId'
                                    value={createTemplates.botId}
                                    onChange={handleCreateTemplateChange}
                                    fullWidth />

                                <TextField size="small"
                                    label="Template name/code"
                                    variant="outlined"
                                    name='templateName'
                                    value={createTemplates.templateName}
                                    onChange={handleCreateTemplateChange}
                                    fullWidth />

                                <FormControl size="small"
                                    variant="outlined" fullWidth>
                                    <InputLabel>Template type</InputLabel>
                                    <Select label="Template" name='templateType' value={createTemplates.templateType} onChange={handleCreateTemplateChange}>
                                        <MenuItem value="text_message">Text</MenuItem>
                                        <MenuItem value="rich_card">Rich Card Stand Alone</MenuItem>
                                        <MenuItem value="carousel">Rich Card Carousel</MenuItem>
                                    </Select>
                                </FormControl>
                                {templateType !== 'rich_card' && templateType !== 'carousel' && (
                                    <TextField size="small"
                                        label="Message content"
                                        variant="outlined"
                                        name='textMessageContent'
                                        value={createTemplates.textMessageContent}
                                        onChange={handleCreateTemplateChange}
                                        multiline rows={4}
                                        fullWidth />
                                )}
                                {templateType === 'rich_card' && (
                                    <>
                                        <FormControl size="small"
                                            variant="outlined" fullWidth>
                                            <InputLabel>Select Card Orientation *</InputLabel>
                                            <Select label="Select Card Orientation *" value={cardOrientation} onChange={handleCardOrientationChange}>
                                                <MenuItem value="vertical">Vertical</MenuItem>
                                                <MenuItem value="horizontal">Horizontal</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            size="small"
                                            variant="outlined"
                                            fullWidth>
                                            <InputLabel>Select Media Height *</InputLabel>
                                            <Select label="Select Media Height *" value={mediaHeight} onChange={handleMediaHeightChange}>
                                                <MenuItem value="short">Short</MenuItem>
                                                <MenuItem value="medium">Medium</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <TextField
                                                size="small"
                                                label="Upload Image"
                                                variant="outlined"
                                                fullWidth
                                                value={selectedImage ? selectedImage.name : ''}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                component="label"
                                                size="small"
                                                onClick={handleClickOpen}
                                                sx={{
                                                    padding: "10px",
                                                    textTransform: 'unset',
                                                    fontWeight: "600",
                                                    borderRadius: '5px',
                                                    backgroundColor: '#000',
                                                    color: "white",
                                                    '&:hover': {
                                                        backgroundColor: '#000',
                                                        color: "white"
                                                    },
                                                }}
                                            >
                                                Upload
                                            </Button>
                                        </Box>

                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>Upload Options</DialogTitle>
                                            <DialogContent>
                                                <Tabs value={tabValue} onChange={handleTabChange}>
                                                    <Tab label="Upload" />
                                                    <Tab label="Upload from URL" />
                                                    <Tab label="Video URL" />
                                                </Tabs>
                                                {tabValue === 0 && (
                                                    <Box mt={2}>
                                                        <Typography variant='span' sx={{ fontSize: "13px" }}>
                                                            The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF. If the image you select doesn’t meet these requirements, you’ll have the opportunity to edit it. If you are uploading a video, the max file size is 10MB.
                                                        </Typography>
                                                        <DialogContentText sx={{ mt: 2 }}>Select an image to upload.</DialogContentText>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            style={{ marginTop: '10px' }}
                                                        />
                                                    </Box>
                                                )}
                                                {tabValue === 1 && (
                                                    <Box mt={2}>
                                                        <Typography variant='span' sx={{ fontSize: "13px" }}>The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF, and be located at a publicly available URL. If the image you upload doesn’t meet these requirements, you’ll have the opportunity to edit it. If you are uploading a video, the max file size is 10MB.</Typography>
                                                        <DialogContentText sx={{ mt: 2 }}>Enter the URL of the image to upload.</DialogContentText>
                                                        <TextField
                                                            fullWidth
                                                            margin="dense"
                                                            label="Image URL"
                                                            type="url"
                                                            variant="outlined"
                                                            onChange={handleUrlChange}
                                                        />
                                                    </Box>
                                                )}
                                                {tabValue === 2 && (
                                                    <Box mt={2}>
                                                        <Typography variant='span' sx={{ fontSize: "13px" }}>The image you specify must be 3:1 aspect ratio, have a max file size of 2MB, have an optimal resolution of 1440 pixels x 480 pixels, and should be a JPEG, JPG, PNG, or GIF.The image must be publicly available after the variable is replaced at run-time. If the image you upload doesn’t meet these requirements, it may appear cropped or distorted. If you are uploading a video, the max file size is 10MB.</Typography>
                                                        <DialogContentText sx={{ mt: 2 }}>Enter the URL of the video.</DialogContentText>
                                                        <TextField
                                                            fullWidth
                                                            margin="dense"
                                                            label="Video URL"
                                                            type="url"
                                                            variant="outlined"
                                                            onChange={handleUrlChange}
                                                        />
                                                    </Box>
                                                )}
                                            </DialogContent>
                                            <DialogActions>
                                                <Button>
                                                    Ok
                                                </Button>
                                                <Button onClick={handleClose} color="primary">
                                                    Cancel
                                                </Button>
                                            </DialogActions>
                                        </Dialog>

                                        <Tooltip title="0/(200) characters used">
                                            <TextField
                                                label="Card Title"
                                                placeholder='0/(200) characters used'
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={1}
                                                size="small"
                                                value={cardTitle}
                                                onChange={handleCardTitleChange}
                                            />
                                        </Tooltip>
                                        <p>0/200 characters used</p>
                                        <TextField
                                            label="Card Description"
                                            placeholder='0/2000 characters used'
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            size="small"
                                            rows={2}
                                            value={cardDescription}
                                            onChange={handleCardDescriptionChange}
                                        />
                                        <p>0/2000 characters used</p>
                                    </>
                                )}
                                {templateType === 'carousel' && (
                                    <>
                                        <FormControl size="small"
                                            variant="outlined"
                                            fullWidth>
                                            <InputLabel>Select Card Width *</InputLabel>
                                            <Select label="Select Card Orientation *" value={cardOrientation} onChange={handleCardOrientationChange}>
                                                <MenuItem value="vertical">Small</MenuItem>
                                                <MenuItem value="horizontal">Large</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                            size="small"
                                            variant="outlined"
                                            fullWidth>
                                            <InputLabel>Select Media Height *</InputLabel>
                                            <Select label="Select Media Height *" value={mediaHeight} onChange={handleMediaHeightChange}>
                                                <MenuItem value="short">Short</MenuItem>
                                                <MenuItem value="medium">Medium</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <TextField
                                                label="Upload Image"
                                                variant="outlined"
                                                fullWidth
                                                value={selectedImage ? selectedImage.name : ''}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                component="label"
                                                sx={{
                                                    padding: "10px",
                                                    textTransform: 'unset',
                                                    fontWeight: "600",
                                                    borderRadius: '5px',
                                                    backgroundColor: '#000',
                                                    color: "white",
                                                    '&:hover': {
                                                        backgroundColor: '#000',
                                                        color: "white"
                                                    },
                                                }}
                                            >
                                                Upload
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </Button>
                                        </Box>
                                        <TextField
                                            label="Card Title"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={1}
                                            value={cardTitle}
                                            onChange={handleCardTitleChange}
                                        />
                                        <TextField
                                            label="Card Description"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={2}
                                            value={cardDescription}
                                            onChange={handleCardDescriptionChange}
                                        />
                                    </>
                                )}
                                <Button onClick={handleCreateTemplates} variant="contained" sx={{
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
                                }}>Start
                                </Button>
                            </Box>
                        </Box>
                    </div>
                    <div className="iphone-x">
                        <i>Speaker</i>
                        <b>Camera</b>
                        <s></s>
                        <div className="inner_content">
                            <div className="inner_content_2">
                                {imagePreviewUrl && (
                                    <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', borderRadius: '5px' }} />
                                )}
                                <h4 className="mobile-title">{cardTitle}</h4>
                                <p className="mobile-description">{cardDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}
