import { Fragment } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Helmet } from 'react-helmet'

export default function Botlist() {

    const invoices = [
        {
            BotName: "Test 1",
            BotType: "Promotional",
            brand: "$250.00", status: "Launched", actions: "View Details",
            paymentMethod: "Credit Card",
        },
        {
            BotName: "Test 2",
            BotType: "Promotional",
            brand: "$250.00", status: "Launched", actions: "View Details",
            paymentMethod: "PayPal",
        },
        {
            BotName: "Test 3",
            BotType: "Promotional",
            brand: "$250.00", status: "Launched", actions: "View Details",
            paymentMethod: "Bank Transfer",
        },
        {
            BotName: "Test 4",
            BotType: "Promotional",
            brand: "$250.00", status: "Launched", actions: "View Details",
            paymentMethod: "Credit Card",
        },
        {
            BotName: "Test 5",
            BotType: "Promotional",
            brand: "$250.00", status: "Launched", actions: "View Details",
            paymentMethod: "PayPal",
        },
        {
            BotName: "Test 6",
            BotType: "Promotional",
            brand: "$250.00", status: "Launched", actions: "View Details",
            paymentMethod: "Bank Transfer",
        },
        {
            BotName: "Test 7",
            BotType: "Otp",
            brand: "$250.00", status: "Launched", actions: "View Details",
            paymentMethod: "Credit Card",
        },
    ]


    return (
        <Fragment>
            <Helmet>
                <title> Bot List | RCS Celetel</title>
            </Helmet>
            <div className="grid mt-2 auto-rows-max items-start gap-0 md:gap-8 lg:col-span-2 xl:grid-cols-4 w-full lg:grid-cols-4">
                <div className=" w-full grid mt-2 auto-rows-max items-start gap-4 md:gap-4 md:w-full lg:col-span-4 lg:w-full sm:w-full">
                    <div className="rounded-md border mt-4 overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Bot Name</TableHead>
                                    <TableHead>Bot Type</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((SLNO) => (
                                    <TableRow key={SLNO.SLNO}>
                                        <TableCell className="font-medium">{SLNO.BotName}</TableCell>
                                        <TableCell>{SLNO.BotType}</TableCell>
                                        <TableCell>{SLNO.brand}</TableCell>
                                        <TableCell>
                                            <Button variant='outline' className='bg-transparent'>
                                                {SLNO.status}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant='outline' className='bg-transparent'>
                                                {SLNO.actions}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
