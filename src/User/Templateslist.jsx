import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import { getTemplateDetailsList, getTemplatedataById, updateTemplatedataById } from '../Service/auth.service';
import { Layout } from '@/Layout/Layout';
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
    { id: 'templateName', label: 'Template Name', minWidth: 170 },
    { id: 'botId', label: 'Template ID', minWidth: 100 },
    { id: 'templateType', label: 'Type', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
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

export default function TemplateList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [templateList, setTemplateList] = React.useState([]);
    const [selectedTemplate, setSelectedTemplate] = React.useState(null);

    // .......................

    const [value, setValue] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [sortOrder, setSortOrder] = React.useState(null);
    const [hideBotId, setHideBotId] = React.useState(false);




    React.useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await getTemplateDetailsList();
                const sortedTemplates = response.templates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                console.log(sortedTemplates, "sort")
                setTemplateList(sortedTemplates);
            } catch (error) {
                console.error('Error fetching template data:', error.message);
            }
        };

        fetchTemplates();
    }, []);


    const handleSort = (order) => {
        setSortOrder(order);
        const sortedTemplates = [...templateList].sort((a, b) => {
            if (order === 'asc') return a.botId.localeCompare(b.botId);
            if (order === 'desc') return b.botId.localeCompare(a.botId);
            return 0;
        });
        setTemplateList(sortedTemplates);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEditClick = async (id) => {
        try {
            const response = await getTemplatedataById(id);
            setSelectedTemplate(response.template);
        } catch (error) {
            console.error('Error fetching template data:', error.message);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const { _id, userId, ...updatedTemplate } = selectedTemplate;
            console.log(userId, "userId")
            console.log(selectedTemplate, "id468788");

            const response = await updateTemplatedataById(_id, updatedTemplate);
            console.log(response, "updateddata");
            setTemplateList(prev => prev.map(template => template._id === _id ? updatedTemplate : template));
            setSelectedTemplate(null);
            alert(response.message);
            console.log(response.message);
        } catch (error) {
            console.error('Error updating template data:', error.message);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTemplate(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Layout>
            <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                    <div className="flex md:flex-row justify-between items-center mt-3">
                        <CardTitle>Template List</CardTitle>
                        <Link to="/addtemplates">
                            <Button className=''>Add templates</Button>
                        </Link>
                    </div>
                    <div className="p-6 border rounded-md overflow-auto">
                        <CardTitle className='text-2xl mb-1'>Welcome back !</CardTitle>
                        <CardDescription>
                            Here is the list of your templates
                        </CardDescription>
                        <div className="grid">
                            <div className="flex flex-wrap justify-start items-center mt-5 gap-1">
                                <Input
                                    placeholder="Filter templates..."
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
                                                <React.Fragment>
                                                    {frameworks.find((framework) => framework.value === value)?.icon}
                                                    <span className="ml-2">
                                                        {frameworks.find((framework) => framework.value === value)?.label}
                                                    </span>
                                                </React.Fragment>
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
                                            column.id === 'botId' && hideBotId ? null : (
                                                <TableCell key={column.id}>
                                                    {column.label === 'Template ID' ? (
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
                                    {templateList.length > 0 ? (
                                        templateList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                                                                        {selectedTemplate && selectedTemplate._id === row._id && (
                                                                            <>
                                                                                <Label htmlFor="templateName" className="text-left">Template name</Label>
                                                                                <Input name="templateName" value={selectedTemplate.templateName} onChange={handleInputChange} />

                                                                                <Label htmlFor="templateType" className="text-left">Template type</Label>
                                                                                <Input name="templateType" value={selectedTemplate.templateType} onChange={handleInputChange} />

                                                                                <Label htmlFor="textMessageContent" className="text-left">Text message content</Label>
                                                                                <Input name="textMessageContent" value={selectedTemplate.textMessageContent} onChange={handleInputChange} />

                                                                                <Label htmlFor="status" className="text-left">Status</Label>
                                                                                <Input name="status" value={selectedTemplate.status} onChange={handleInputChange} />
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
                            count={templateList.length}
                            rowsPerPage={rowsPerPage}
                            className='mt-4'
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div >
        </Layout >
    );
}