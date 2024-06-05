import { Fragment, useEffect, useState } from 'react';
import { getCampaignsDetails } from '../Service/auth.service';
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

const columns = [
    { id: 'templateName', label: 'Template Name', minWidth: 170 },
    { id: 'botId', label: 'Bot ID', minWidth: 100 },
    { id: 'campaignName', label: 'Campaign Name', minWidth: 100 },
    { id: 'totalNumbers', label: 'Total Numbers', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function RcsDetails() {
    const [campaign, setGetCampaigns] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await getCampaignsDetails();
                console.log(response, "responsercsdetails");
                setGetCampaigns(response);
            } catch (error) {
                console.error('Error fetching template data:', error.message);
            }
        };

        fetchTemplates();
    }, []);

    const startCampaign = async (id) => {
        try {
            await axios.post(`http://157.15.202.251/api/campaigns/start-campaign/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Campaign started successfully!");
            // You may want to update the campaign list after starting the campaign
            // fetchTemplates();
        } catch (error) {
            console.error("Failed to start campaign:", error.message);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                        <div className="flex flex-col md:flex-row justify-between mt-3">
                            <CardTitle className='text-3xl'>
                                Send RCS
                            </CardTitle>
                            <Link to="/createcampaign">
                                <Button className=''>Create Campaign</Button>
                            </Link>
                        </div>

                        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
                            <div className="flex flex-col md:flex-row justify-between mt-3">
                                <CardTitle className='text-2xl'>Campaign List</CardTitle>
                            </div>
                            <TableContainer>
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
                                        {campaign.length > 0 ? (
                                            campaign.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id}>
                                                            {column.id === 'actions' ? (
                                                                <div className="text-center flex space-x-2">
                                                                    <Dialog>
                                                                        <DialogTrigger>
                                                                            <Button onClick={() => startCampaign(row._id)}>Start</Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent>
                                                                            <DialogHeader>
                                                                                <DialogTitle>Start Template</DialogTitle>
                                                                                <DialogDescription>Make changes to your template here. Click save when youre done.</DialogDescription>
                                                                            </DialogHeader>
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
                                count={campaign.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
}
