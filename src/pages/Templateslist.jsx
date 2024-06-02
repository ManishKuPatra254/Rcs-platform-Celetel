import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getTemplateDetailsList } from '../Service/auth.service';
import { Layout } from '@/Layout/Layout';

const columns = [
    { _id: 'templateName', label: 'Template Name', minWidth: 170 },
    { _id: 'botId', label: 'Template ID', minWidth: 100 },
    { _id: 'templateType', label: 'Type', minWidth: 100 },
    { _id: 'status', label: 'Status', minWidth: 100 },
];

export default function TemplateList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [templateList, setTemplateList] = React.useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        const getTemplateDetails = async () => {
            try {
                const response = await getTemplateDetailsList();
                console.log(response.templates)
                setTemplateList(response.templates);
            } catch (error) {
                console.error('Error fetching template data:', error.message);
            }
        };

        getTemplateDetails();
    }, []);

    return (
        <React.Fragment>
            <Layout>
                <div className="w-full mt-2 gap-4 md:w-full xl:w-full ">
                    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
                        <div className="flex flex-col md:flex-row justify-between mt-3 ">
                            <h1>Templates</h1>
                            <Link to={'/addtemplates'}>
                                <Button
                                    variant='contained'
                                    sx={{
                                        padding: '5px 50px',
                                        textTransform: 'unset',
                                        fontWeight: '600',
                                        borderRadius: '5px',
                                        fontSize: '13px',
                                        backgroundColor: '#000',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#000',
                                            color: 'white',
                                        },
                                        '@media (max-width:1000px)': {
                                            mt: 2,
                                        },
                                    }}
                                >
                                    Add templates
                                </Button>
                            </Link>
                        </div>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column._id} style={{ minWidth: column.minWidth }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {templateList.length > 0 ? (
                                        templateList
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column._id}>
                                                            {column._id === 'createdAt' || column._id === 'updatedAt'
                                                                ? new Date(row[column._id]).toLocaleString()
                                                                : row[column._id]}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} align="center">
                                                No templates found
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
            </Layout>
        </React.Fragment>
    );
}
