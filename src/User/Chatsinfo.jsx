import { Layout } from '@/Layout/Layout';
import { Fragment, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArchiveRestore, Clock, CornerDownLeft, Package2, Paperclip, Trash2, Undo2 } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Chatdetails() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [messages, setMessages] = useState([
        { type: 'receiver', content: 'Hello, how can I help you?' },
        { type: 'sender', content: 'I have a question about the project.' },
        { type: 'receiver', content: 'Sure, what do you need to know?' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (newMessage.trim() === '') return;
        setMessages([...messages, { type: 'sender', content: newMessage }]);
        setNewMessage('');
    };

    const handleCardClick = (cardDetails) => {
        setSelectedCard(cardDetails);
    };

    const cardDetailsList = [
        {
            title: 'William Smith',
            description: 'Meeting Tomorrow',
        },
        {
            title: 'Alice Smith',
            description: 'Project Update',

        },
        {
            title: 'Bob Johnson',
            description: 'Weekend Plans',

        },
        {
            title: 'Emily Davis',
            description: 'Question about Budget Update',

        },
        {
            title: 'Michael Wilson',
            description: 'Important Announcement',

        },
        {
            title: 'Sarah Brown',
            description: 'Feedback on Proposal',
        },
        {
            title: 'David Lee',
            description: 'New Project Idea',

        },
        {
            title: 'Daniel Johnson',
            description: 'Feedback Request',

        },
    ];

    return (
        <Fragment>
            <Layout>
                <Helmet>
                    <title> Chats | RCS Celetel</title>
                </Helmet>
                <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-1 sm:grid-cols-1">
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="max-w-full rounded-lg border"
                    >
                        <ResizablePanel defaultSize={40}>
                            <div className="rounded-md p-3">
                                <div className="flex justify-between">
                                    <Tabs defaultValue="cURL" className="w-full">
                                        <div className="p-4 flex justify-between items-center w-full">
                                            <h2 className='font-bold text-3xl'>Chats</h2>
                                            <TabsList>
                                                <TabsTrigger value="cURL">All chats</TabsTrigger>
                                                <TabsTrigger value="PHP">Unread</TabsTrigger>
                                            </TabsList>
                                        </div>
                                        <div className="p-4">
                                            <Input
                                                placeholder="Search"
                                                className="w-full text-sm"
                                            />
                                        </div>
                                        <TabsContent value="cURL">
                                            <div className="h-[600px] overflow-auto custom-scrollbar p-3">
                                                {cardDetailsList.map((cardDetails, index) => (
                                                    <div key={index} onClick={() => handleCardClick(cardDetails)} className="mb-2 cursor-pointer">
                                                        <div className="px-4 border-b-2 border-gray-200 rounded-sm py-3">
                                                            <CardTitle className="text-sm font-bold">{cardDetails.title}</CardTitle>
                                                            <p className="text-sm">{cardDetails.description}</p>
                                                            <CardDescription className="text-xs font-light truncate">
                                                                {cardDetails.content}
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="PHP">
                                            <Card x-chunk="dashboard-05-chunk-3" className="mb-4">
                                                <CardHeader className="px-7">
                                                    <CardTitle>Example API Request</CardTitle>
                                                    <CardDescription>
                                                        Determine the URL of the API endpoint you need to interact with. This is provided by the API documentation.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="overflow-x-auto">
                                                        <pre className="whitespace-pre-wrap text-sm"></pre>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={60}>
                            <div className="p-4 w-full flex flex-col h-full">
                                <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-transparent">
                                    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                                        <Link
                                            href="#"
                                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                                        >
                                            <Package2 className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                                        >
                                            <ArchiveRestore className="h-5 w-5" />

                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                                        >
                                            <Clock className="h-6 w-6" />
                                        </Link>

                                    </nav>

                                    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                                        <div className="">
                                            <Undo2 />

                                        </div>
                                    </div>
                                </header>
                                {selectedCard ? (
                                    <div>
                                        <Avatar>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-sm font-bold">{selectedCard.title}</h3>
                                        <p className="text-xs">{selectedCard.description}</p>
                                        <div className="border mt-4"></div>

                                    </div>
                                ) : (
                                    <p className='text-xs mt-3'>Select a card to see details here</p>
                                )}

                                <div className="flex-grow">
                                    <div className="flex flex-col gap-2 mt-4">
                                        {messages.map((message, index) => (
                                            <div key={index} className={`flex ${message.type === 'sender' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`p-3 text-xs font-medium rounded-md max-w-xs ${message.type === 'sender' ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                                    {message.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="sticky bottom-0">
                                    <form
                                        // eslint-disable-next-line react/no-unknown-property
                                        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                                    >
                                        <Label htmlFor="message" className="sr-only">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            className="min-h-12 resize-none border-0 p-3 outline-none shadow-none focus-visible:ring-0"
                                        />
                                        <div className="flex items-center p-3 pt-0 mt-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <Paperclip className="size-4" />
                                                        <span className="sr-only">Attach file</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top">Attach File</TooltipContent>
                                            </Tooltip>
                                            <Button size="sm" className="ml-auto gap-1.5" onClick={handleSendMessage}>
                                                Send Message
                                                <CornerDownLeft className="size-3.5" />
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </Layout>
        </Fragment>
    );
}
