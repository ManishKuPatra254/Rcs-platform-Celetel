import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Fragment, useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Phoneinput from './Phoneinput'
import { Helmet } from 'react-helmet'
import { Card, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, Globe, Mail, PhoneCall } from 'lucide-react'
import { CiBatteryFull } from 'react-icons/ci'
import { FaSignal } from 'react-icons/fa'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


export default function Createbot() {
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


    return (
        <Fragment>
            <Helmet>
                <title> Create Bot | RCS Celetel</title>
            </Helmet>
            <div className="grid auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-3 w-full lg:grid-cols-3">
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2">
                    <div className="flex lg:max-w-xl">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">RCS Bot Details</h3>
                                <p className="text-sm text-muted-foreground">This is where bot will be created</p>
                            </div>

                            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                            <form className="space-y-8">
                                <div className="space-y-2">
                                    <p className='font-medium text-sm'>Bot type* : Domestic</p>
                                    <p className='text-xs text-muted-foreground'>Please note that it is the sole discretion of VI to mark a bot as domestic or international. In case, VI marks the bot as international, you will need to onboard the bot from your international account.</p>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium" htmlFor="">Bot Message Type*</Label>

                                        <RadioGroup defaultValue="default" className='flex justify-between'>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="default" id="r1" />
                                                <Label htmlFor="r1">OTP</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="comfortable" id="r2" />
                                                <Label htmlFor="r2">Transactional</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="compact" id="r3" />
                                                <Label htmlFor="r3">Promotional</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="">Bot Name</Label>
                                        <Input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" name="username" />
                                        <p className="text-[0.8rem] text-muted-foreground">Enter the name of the chatbot that the user will see at the top of the message thread (40 chars. max)</p>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="">Brand Name</Label>
                                        <Input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" name="username" />
                                        <p className="text-[0.8rem] text-muted-foreground">Enter the brand name with which your chatbot will be associated.
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-3">
                                    <Label> Bot Logo* </Label>
                                    <p className='text-xs'>Provide a logo for your bot that will be displayed in connection with the bots name.</p>
                                    <Input type='file' />

                                    <div className="space-y-3">
                                        <Label>  Banner Image*</Label>
                                        <p className='text-xs'>Provide a brand image for your bot that will be displayed in the bots Info & &apos;
                                            options screen.
                                            Note: Your logo will be overlaid on the Banner Image (bottom centre) so be careful with your design.</p>
                                        <Input type='file' />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Short Description*</Label>
                                        <p className='text-xs'>Enter the short description (100 chars. max).</p>
                                        <Textarea />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Primary phone number</Label>
                                        <Phoneinput />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Primary Email Id</Label>
                                        <Input className='text-xs' placeholder='abc@gmail.com' />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Primary Website</Label>
                                        <Input className='text-xs' placeholder='https://' />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Terms of Use URL</Label>
                                        <p className='text-xs'>Enter the URL of the website</p>
                                        <Input className='text-xs' />
                                    </div>

                                    <div className="space-y-3">
                                        <Label> Privacy Policy URL*</Label>
                                        <p className='text-xs'>Enter the URL of the website</p>
                                        <Input className='text-xs' />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Select the development platform that you will use to create your bot (GSMA API or Google styled API)*</Label>
                                        <p className='text-xs'>Enter the URL of the website</p>
                                        <Select>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select a developement platform" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="apple">Google Api</SelectItem>
                                                    <SelectItem value="banana">GSMA Api</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>


                                    <div className="space-y-3">
                                        <Label> Chatbot Webhook</Label>
                                        <p className='text-xs'>Enter the webhook that your bot will receive messages from the VI agent.
                                            NOTE: The webhook needs to be active and be able to respond with a 200 OK to POST requests.
                                        </p>
                                        <Input className='text-xs' />
                                    </div>


                                    <div className="space-y-3">
                                        <Label> Languages Supported*</Label>
                                        <p className='text-xs'>Please specify the languages supported by the bot.</p>
                                        <Input className='text-xs' />
                                    </div>

                                    <div className="flex items-center mt-2 space-x-2">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            I agree to launch the bot on all Indian carriers.
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-center justify-end">
                                    <Button className="text-xs" type='submit'>Create bot</Button>
                                    <Button className="text-xs" variant='outline'>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-auto">
                    <Tabs defaultValue="conversation" className="w-auto">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="conversation">Conversation</TabsTrigger>
                            <TabsTrigger value="businessinfo">Business Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="conversation">
                            <Card className='overflow-auto custom-scrollbar'>
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
                                        <p className='text-slate-900 text-md font-semibold'>{ }</p>
                                    </div>
                                    <div className="inner_content">
                                        <div className="inner_content_2">
                                            <p className="text-md font-extrabold text-blue-900 mt-2 break-words text-ellipsis">{ }</p>
                                            <p className="text-sm mt-2 font-semibold break-words text-ellipsis text-red-400">{ }</p>
                                            <p className="font-medium text-xs mt-2 break-words text-ellipsis text-blue-950">{ }</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="businessinfo">
                            <Card className='overflow-auto'>
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
                                            <p className='text-slate-900 text-md font-semibold'>{ }</p>
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
            </div>
        </Fragment>
    )
}
