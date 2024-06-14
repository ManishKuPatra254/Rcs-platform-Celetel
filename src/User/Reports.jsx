import { Layout } from '@/Layout/Layout';
import { Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function Reports() {
    const location = useLocation();
    const isCampaignRoute = location.pathname.includes('/reports/campaign/');

    return (
        <Fragment>
            <Layout>
                {!isCampaignRoute && (
                    <Fragment>
                        {/* reports section contents here */}
                        <h1>i am manish</h1>
                    </Fragment>
                )}
                <Outlet />
            </Layout>
        </Fragment>
    );
}
