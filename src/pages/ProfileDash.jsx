import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { changePassword, createBots, getProfile, updateBot, updateProfile } from '../Service/auth.service';
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CardTitle } from '@/components/ui/card';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        username: "",
        phone: "",
        company: ""
    });


    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [createBot, setCreateBot] = useState({
        botId: "",
        botName: "",
    });

    const [currentBotId, setCurrentBotId] = useState({
        botId: "",
    });


    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await getProfile();
                console.log(response.user);

                setProfile({
                    name: response.user.name,
                    email: response.user.email,
                    username: response.user.username,
                    phone: response.user.phone,
                    company: response.user.company,
                });
            } catch (error) {
                console.error('Error fetching profile data:', error.message);
            }
        };

        getProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
        setPassword({
            ...password,
            [name]: value,
        });
        setCreateBot({
            ...createBot,
            [name]: value,
        });
        setCurrentBotId({
            ...currentBotId,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await updateProfile(profile);
            console.log('Profile updated successfully:', response.message);
            setProfile(response);
            alert(response.message);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };


    const handleChangePassword = async () => {
        try {
            const response = await changePassword(password);
            console.log('Profile updated successfully:', response.message);
            setPassword('');
            alert(response.message);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };


    const handleCreateBot = async () => {
        try {
            const response = await createBots(createBot);
            console.log('Profile updated successfully:', response.message);
            setCreateBot('');
            alert(response.message);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };
    const handleUpdateBot = async () => {
        try {
            const response = await updateBot(currentBotId);
            console.log('Profile updated successfully:', response.message);
            setCurrentBotId('');
            alert(response.message);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleCancel = () => {
        // handle cancel logic, maybe reset form or navigate away
    };

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className="grid mt-2 auto-rows-max items-start gap-4 md:gap-4 lg:col-span-2">
                        <CardTitle className='text-3xl'>Profile Details</CardTitle>
                        <Label htmlFor="">Username</Label>
                        <Input
                            name="username"
                            value={profile.username}
                            onChange={handleInputChange} />

                        <Label htmlFor="Email">Email</Label>
                        <Input
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            disabled
                        />

                        <Label htmlFor="Company">Company</Label>
                        <Input
                            name="company"
                            value={profile.company}
                            onChange={handleInputChange}
                        />
                        <Label htmlFor="Phone number">Phone number</Label>
                        <Input
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange} />

                        <Box sx={{ display: "flex", gap: "15px", justifyContent: "flex-end", mt: 2 }}>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>Save</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently update your
                                            account and remove your old data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleSave}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Button onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </div>
                    <div className=" grid mt-2 auto-rows-max items-start gap-4 md:gap-4 lg:col-span-2">
                        <CardTitle className='text-3xl'>Bot Details</CardTitle>

                        <Label htmlFor="Bot Id">Bot Id</Label>
                        <Input
                            name="botId"
                            value={createBot.botId}
                            onChange={handleInputChange}

                        />
                        <Label htmlFor="Bot Name"> Bot Name</Label>
                        <Input name="botName"
                            value={createBot.botName}
                            onChange={handleInputChange}
                        />
                        <Box sx={{ display: "flex", gap: "15px", justifyContent: "flex-end", mt: 2 }}>
                            <Button onClick={handleCreateBot}>Create</Button>
                            <Button>Cancel</Button>
                        </Box>
                    </div>
                    <div className=" grid mt-2 auto-rows-max items-start gap-4 md:gap-4 lg:col-span-2">
                        <CardTitle className="text-3xl">
                            Change Password
                        </CardTitle>
                        <Label htmlFor="Email">Old Password</Label>
                        <Input
                            name="oldPassword"
                            value={password.oldPassword}
                            onChange={handleInputChange}

                        />
                        <Label htmlFor="New Password">New Password</Label>
                        <Input
                            name="newPassword"
                            value={password.newPassword}
                            onChange={handleInputChange}

                        />
                        <Box sx={{ display: "flex", gap: "15px", justifyContent: "flex-end", mt: 2 }}>
                            <Button onClick={handleChangePassword}>Update</Button>
                            <Button>Cancel</Button>
                        </Box>
                    </div>
                    <div className=" grid mt-2 auto-rows-max items-start gap-4 md:gap-4 lg:col-span-2">
                        <CardTitle className='text-3xl'>Update Bot</CardTitle>

                        <Label htmlFor="Bot Id">Bot Id</Label>
                        <Input
                            name="botId"
                            value={currentBotId.botId}
                            onChange={handleInputChange}

                        />
                        <Label htmlFor="Bot name">Bot name</Label>
                        <Input
                            name="botName"
                            value={currentBotId.botName}
                            onChange={handleInputChange}
                            disabled
                        />
                        <Box sx={{ display: "flex", gap: "15px", justifyContent: "flex-end", mt: 2 }}>
                            <Button onClick={handleUpdateBot}>Update</Button>
                            <Button>Cancel</Button>
                        </Box>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}

export default Profile;
