import { Layout } from '@/Layout/Layout'
import { Fragment, useEffect, useState } from 'react'
import TablePagination from '@mui/material/TablePagination';
import { getAllUsers, getUsersByEmail, updateUsersByEmail } from '../Service/auth.service';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, ChevronsUpDown, CircleCheck, CirclePlus, CircleX, Clock12 } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Skeleton } from '@/components/ui/skeleton';


const columns = [
    { id: 'clientId', label: 'Client ID', minWidth: 100 },
    { id: 'clientSecret', label: 'Client Secret', minWidth: 100 },
    { id: 'email', label: 'Email ID', minWidth: 100 },
    { id: 'phone', label: 'Phone No.', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'username', label: 'Username', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
];



const frameworks = [
    {
        value: "inprogress",
        label: "In Progress",
        icon: <Clock12 className="h-4 w-4 mr-2" />

    },
    {
        value: "completed",
        label: "Completed",
        icon: <CircleCheck className="h-4 w-4 mr-2" />,
    },
    {
        value: "failed",
        label: "Failed",
        icon: <CircleX className="h-4 w-4 mr-2" />,
    },
]

export default function Userlists() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [usersList, setUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // .......................

    const [value, setValue] = useState("")
    const [open, setOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState(null);
    const [hideBotId, setHideBotId] = useState(false);
    console.log(sortOrder, "ssorrtt");

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await getAllUsers();
                const sortedUsers = response.users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                console.log(sortedUsers, "sort")
                setUsersList(sortedUsers);
            } catch (error) {
                console.error('Error fetching template data:', error.message);
            }
        };

        fetchTemplates();
    }, []);


    const handleSort = (order) => {
        setSortOrder(order);
        const sortedTemplates = [...usersList].sort((a, b) => {
            if (order === 'asc') return a.botId.localeCompare(b.botId);
            if (order === 'desc') return b.botId.localeCompare(a.botId);
            return 0;
        });
        setUsersList(sortedTemplates);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEditClick = async (email) => {
        try {
            const response = await getUsersByEmail(email);
            setSelectedUser(response.users);
        } catch (error) {
            console.error('Error fetching template data:', error.message);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const { _id, userId, ...updateUser } = selectedUser;
            console.log(userId, "userId")
            console.log(selectedUser, "id468788");

            const response = await updateUsersByEmail(updateUser);
            console.log(response, "updateddata");
            setUsersList(prev => prev.map(user => user._id === _id ? updateUser : user));
            setSelectedUser(null);
            alert(response.message);
            console.log(response.message);
        } catch (error) {
            console.error('Error updating template data:', error.message);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser(prev => ({ ...prev, [name]: value }));
    };
    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                        <div className="flex md:flex-row justify-between items-center mt-3">
                            <CardTitle>Users Lists</CardTitle>
                            {/* <Link to="/addtemplates">
                                <Button className=''>Add templates</Button>
                            </Link> */}
                        </div>
                        <div className="p-6 border rounded-md overflow-auto">
                            <CardTitle className='text-2xl mb-1'>Welcome back !</CardTitle>
                            <CardDescription>
                                Here is the list of your users
                            </CardDescription>
                            <div className="grid">
                                <div className="flex flex-wrap justify-start items-center mt-5 gap-1">
                                    <Input
                                        placeholder="Filter users..."
                                        className="max-w-xs mr-4 text-sm"
                                    />
                                    <Popover open={open} onOpenChange={setOpen} className="mt-4">
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="flex justify-between items-center px-4 py-0 text-xs"
                                            >
                                                {value ? (
                                                    <Fragment>
                                                        {frameworks.find((framework) => framework.value === value)?.icon}
                                                        <span className="ml-2">
                                                            {frameworks.find((framework) => framework.value === value)?.label}
                                                        </span>
                                                    </Fragment>
                                                ) : (
                                                    <span>Status</span>
                                                )}
                                                <CirclePlus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Status" />
                                                <CommandList>
                                                    <CommandEmpty>No templates found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {frameworks.map((framework) => (
                                                            <CommandItem
                                                                key={framework.value}
                                                                value={framework.value}
                                                                onSelect={(currentValue) => {
                                                                    setValue(currentValue === value ? "" : currentValue)
                                                                    setOpen(false)
                                                                }}>
                                                                {framework.icon}
                                                                <span className="ml-2">{framework.label}</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <Button
                                        variant="outline"
                                        className="ml-auto text-xs bg-transparent">
                                        <ArrowRightLeft className='h-4 w-4 mr-3' />
                                        View
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-md border mt-4 overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {columns.map((column) => (
                                                column.id === 'email' && hideBotId ? null : (
                                                    <TableCell key={column.id}>
                                                        {column.label === 'Email ID' ? (
                                                            <Menubar className="bg-transparent border-transparent">
                                                                <MenubarMenu>
                                                                    <MenubarTrigger className='flex gap-4 cursor-pointer'>
                                                                        {column.label}
                                                                        <ChevronsUpDown className='h-4 w-4 text-gray-400' />
                                                                    </MenubarTrigger>
                                                                    <MenubarContent>
                                                                        <MenubarItem onClick={() => handleSort('asc')}>Ascending</MenubarItem>
                                                                        <MenubarItem onClick={() => handleSort('desc')}>Descending</MenubarItem>
                                                                        <MenubarItem onClick={() => setHideBotId(true)}>Hide</MenubarItem>
                                                                    </MenubarContent>
                                                                </MenubarMenu>
                                                            </Menubar>
                                                        ) : (
                                                            column.label
                                                        )}
                                                    </TableCell>
                                                )
                                            ))}
                                        </TableRow>
                                    </TableHeader>



                                    <TableBody>
                                        {usersList.length > 0 ? (
                                            usersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id}>
                                                            {column.id === 'actions' ? (
                                                                <div className="text-center flex space-x-2">
                                                                    <Dialog>
                                                                        <DialogTrigger onClick={() => handleEditClick(row._id)}>
                                                                            <Button>
                                                                                Edit
                                                                            </Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent>
                                                                            <DialogHeader>
                                                                                <DialogTitle>Edit Template</DialogTitle>
                                                                                <DialogDescription>Make changes to your template here. Click save when youre done.</DialogDescription>
                                                                            </DialogHeader>
                                                                            {selectedUser && selectedUser._id === row._id && (
                                                                                <>
                                                                                    <Label htmlFor="email" className="text-left">Email Address</Label>
                                                                                    <Input name="email" value={selectedUser.email} onChange={handleInputChange} />

                                                                                    <Label htmlFor="phone" className="text-left">Phone No</Label>
                                                                                    <Input name="phone" value={selectedUser.phone} onChange={handleInputChange} />

                                                                                    <Label htmlFor="textMessageContent" className="text-left">Text message content</Label>
                                                                                    <Input name="type" value={selectedUser.type} onChange={handleInputChange} />

                                                                                    <Label htmlFor="status" className="text-left">Status</Label>
                                                                                    <Input name="status" value={selectedUser.status} onChange={handleInputChange} />
                                                                                    <DialogFooter>
                                                                                        <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
                                                                                    </DialogFooter>
                                                                                </>
                                                                            )}
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </div>
                                                            ) : (
                                                                column.id === 'createdAt' || column.id === 'updatedAt'
                                                                    ? new Date(row[column.id]).toLocaleString()
                                                                    : row[column.id]
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} align="center">
                                                    <div className="flex flex-col space-y-3">
                                                        <Skeleton className="h-full w-full rounded-xl" />
                                                        <div className="space-y-2">
                                                            <Skeleton className="h-4 w-full" />
                                                            <Skeleton className="h-4 w-full" />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={usersList.length}
                                rowsPerPage={rowsPerPage}
                                className='mt-4'
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}
