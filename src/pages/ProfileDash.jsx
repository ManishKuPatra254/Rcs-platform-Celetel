import { Fragment, useEffect, useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { changePassword, getProfile, updateProfile } from '../Service/auth.service';
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

    const handleCancel = () => {
        // handle cancel logic, maybe reset form or navigate away
    };

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2">
                        <Typography variant="h4">
                            Profile Details
                        </Typography>
                        <TextField
                            label="Username"
                            name="username"
                            value={profile.username}
                            onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
                        <TextField
                            label="Company"
                            name="company"
                            value={profile.company}
                            onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
                        <TextField
                            label="Phone number"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
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
                            <Button sx={{
                                textTransform: "unset",
                                background: "black",
                                '&:hover': {
                                    backgroundColor: '#000',
                                    color: "white"
                                },
                            }}
                                variant="contained" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    </div>
                    <div className=" grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2">
                        <Typography variant="h4">
                            Bot Details
                        </Typography>
                        <TextField
                            label="Bot Id"
                            // name="username"
                            // value={profile.username}
                            // onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
                        <TextField
                            label="Bot Name"
                            // name="username"
                            // value={profile.username}
                            // onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
                        <Box sx={{ display: "flex", gap: "15px", justifyContent: "flex-end", mt: 2 }}>
                            <Button>Create</Button>
                            <Button>Cancel</Button>
                        </Box>
                    </div>
                    <div className=" grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2">
                        <Typography variant="h4">
                            Change Password
                        </Typography>
                        <TextField
                            label="Old Password"
                            name="oldPassword"
                            value={password.oldPassword}
                            onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
                        <TextField
                            label="New Password"
                            name="newPassword"
                            value={password.newPassword}
                            onChange={handleInputChange}
                            fullWidth
                            size='small'
                        />
                        <Box sx={{ display: "flex", gap: "15px", justifyContent: "flex-end", mt: 2 }}>
                            <Button onClick={handleChangePassword}>Update</Button>
                            <Button>Cancel</Button>
                        </Box>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}

export default Profile;
