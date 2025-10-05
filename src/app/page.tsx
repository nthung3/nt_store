import HomeBanner from '@/components/home/home-banner';
import HomeBestQty from '@/components/home/home-best-qty';
import HomeCustomer from '@/components/home/home-customer';
import HomeMenu from '@/components/home/home-menu';
import HomeOurApp from '@/components/home/home-our-app';
import HomeWelcome from '@/components/home/home-welcome';
import { MainLayout } from '@/components/layouts/main-layout';

export default function HomePage(): JSX.Element {
    return (
        <MainLayout showNavbar showFooter>
            <HomeBanner />
            <HomeBestQty />
            <HomeWelcome />
            <HomeMenu />
            <HomeOurApp />
            <HomeCustomer />
        </MainLayout>
    );
}
