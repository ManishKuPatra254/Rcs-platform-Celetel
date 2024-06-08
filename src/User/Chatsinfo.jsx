import { Layout } from '@/Layout/Layout'
import { Fragment } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function Chatdetails() {
    return (
        <Fragment>
            <Layout>
                <div className="grid grid-cols-2 gap-2 border-2 p-2 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="border-2 p-4">
                        <div className="">
                            <h2 className='font-bold'>Chats</h2>
                        </div>

                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account</CardTitle>
                                        <CardDescription>
                                            Make changes to your account here. Click save when youre done.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" defaultValue="Pedro Duarte" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="username">Username</Label>
                                            <Input id="username" defaultValue="@peduarte" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="password">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Password</CardTitle>
                                        <CardDescription>
                                            Change your password here. After saving, youll be logged out.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input id="new" type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="border-2 p-4 ">
                        dkfjhjhgjfhgjf
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}
