import { Fragment, useEffect, useState } from 'react';
import { Layout } from '@/Layout/Layout';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getCampaignsDetails, startCampaign } from '../Service/auth.service'; // Import startCampaign function

const columns = [
    { id: 'templateName', label: 'Template Name', minWidth: 170 },
    { id: 'botId', label: 'Bot ID', minWidth: 100 },
    { id: 'campaignName', label: 'Campaign Name', minWidth: 100 },
    { id: 'totalNumbers', label: 'Total Numbers', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function RcsDetails() {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getCampaignsDetails();
                setCampaigns(response);
            } catch (error) {
                console.error('Error fetching campaign data:', error.message);
            }
        };

        fetchCampaigns();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleStartCampaign = async (campaignId) => {
        try {
            await startCampaign(campaignId);
            const updatedCampaigns = await getCampaignsDetails();
            setCampaigns(updatedCampaigns);
            toast("Campaign started successfully");
        } catch (error) {
            console.error('Error starting campaign:', error.message);
        }
    };

    return (
        <Fragment>
            <Layout>
                <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                    <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                        <div className="flex md:flex-row justify-between mt-3">
                            <CardTitle className='text-3xl'>
                                Send RCS
                            </CardTitle>
                            <Link to="/createcampaign">
                                <Button className=''>Create Campaign</Button>
                            </Link>
                        </div>

                        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
                            <div className="flex flex-col md:flex-row justify-between mt-3">
                                <CardTitle className='text-2xl  mb-4'>Campaign List</CardTitle>
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
                                        {campaigns.length > 0 ? (
                                            campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={campaign._id}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id}>
                                                            {column.id === 'actions' ? (
                                                                <div className="text-center flex space-x-2">
                                                                    <Button onClick={() => handleStartCampaign(campaign._id)}>Start</Button>
                                                                </div>
                                                            ) : (
                                                                column.id === 'createdAt' || column.id === 'updatedAt'
                                                                    ? new Date(campaign[column.id]).toLocaleString()
                                                                    : campaign[column.id]
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
                                count={campaigns.length}
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
