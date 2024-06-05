import { Fragment, useEffect, useState } from 'react';
// import { Box } from '@mui/material';
import { changePassword, createBots, getProfile, updateBot, updateProfile } from '../Service/auth.service';
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

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

    // const [selectedOption, setSelectedOption] = useState('updateProfile');

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
            // alert(response.message);
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
            toast(response.message, {
                description: formattedDate,
                action: {
                    label: "OK",
                },
            });
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleChangePassword = async () => {
        try {
            const response = await changePassword(password);
            if (response.success === true) {
                console.log('Profile updated successfully:', response.message);
                setPassword('');
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
                toast(response.message, {
                    description: formattedDate,
                    action: {
                        label: "OK",
                    },
                });
            }
            else if (response.success === false) {
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
                toast(response.message, {
                    description: formattedDate,
                })
            }
        } catch (error) {

            console.error('Error updating profile:', error.message);
        }
    };

    const handleCreateBot = async () => {
        try {
            const response = await createBots(createBot);
            console.log('Profile updated successfully:', response.message);
            setCreateBot('');
            // alert(response.message);
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
            toast(response.message, {
                description: formattedDate,
                action: {
                    label: "OK",
                    onClick: () => console.log("OK"),

                },
            });
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };


    const handleUpdateBot = async () => {
        try {
            const response = await updateBot(currentBotId);
            console.log('Profile updated successfully:', response.message);
            setCurrentBotId('');
            // alert(response.message);
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
            toast(response.message, {
                description: formattedDate,
                action: {
                    label: "OK",
                },
            });
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    // const handleCancel = () => {
    //     // handle cancel logic, maybe reset form or navigate away
    // };

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-11/12 lg:col-span-4 lg:w-10/12 sm:w-full">
                        <CardTitle className="text-3xl">
                            Profile Management
                        </CardTitle>
                        <Tabs defaultValue="updateProfile" className="">
                            <TabsList className="grid w-full grid-cols-4 sm:grid-col-2">
                                <TabsTrigger value="updateProfile">Profile</TabsTrigger>
                                <TabsTrigger value="changePassword"> Password</TabsTrigger>
                                <TabsTrigger value="createBot">Create Bot</TabsTrigger>
                                <TabsTrigger value="updateBot">Update Bot</TabsTrigger>
                            </TabsList>
                            <TabsContent value="updateProfile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account</CardTitle>
                                        <CardDescription>
                                            Make changes to your account here. Click save when youre done.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="username">Username</Label>
                                            <Input
                                                name="username"
                                                value={profile.username}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                name="email"
                                                value={profile.email}
                                                onChange={handleInputChange}
                                                disabled
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="company">Company</Label>
                                            <Input
                                                name="company"
                                                value={profile.company}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="phone">Phone number</Label>
                                            <Input
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleSave}>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="changePassword">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Change Password</CardTitle>
                                        <CardDescription>
                                            Change your password here. After saving, youll be see the changes.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input
                                                name="oldPassword"
                                                value={password.oldPassword}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input
                                                name="newPassword"
                                                value={password.newPassword}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleChangePassword}>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="createBot">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Create Bot</CardTitle>
                                        <CardDescription>
                                            Create your new bot here. After saving, youll be logged out.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="botId">Bot Id</Label>
                                            <Input
                                                name="botId"
                                                value={createBot.botId}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="botName">Bot name</Label>
                                            <Input
                                                name="botName"
                                                value={createBot.botName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleCreateBot}>Create bot</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="updateBot">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Update Bot</CardTitle>
                                        <CardDescription>
                                            Update your bot here. After saving, youll be able see changes.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="botId">Bot Id</Label>
                                            <Input
                                                name="botId"
                                                value={currentBotId.botId}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="botName">Bot name</Label>
                                            <Input
                                                name="botName"
                                                value={currentBotId.botName}
                                                onChange={handleInputChange}
                                                disabled
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleUpdateBot}>Update bot</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}

export default Profile;
