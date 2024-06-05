import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
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
import { CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const columns = [
    { id: 'templateName', label: 'Template Name', minWidth: 170 },
    { id: 'botId', label: 'Template ID', minWidth: 100 },
    { id: 'templateType', label: 'Type', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function TemplateList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [templateList, setTemplateList] = React.useState([]);
    const [selectedTemplate, setSelectedTemplate] = React.useState(null);

    React.useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await getTemplateDetailsList();
                setTemplateList(response.templates);
            } catch (error) {
                console.error('Error fetching template data:', error.message);
            }
        };

        fetchTemplates();
    }, []);

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
                    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
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
                                                <Loader2 className="h-8 w-full animate-spin" />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={templateList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </Layout>
    );
}