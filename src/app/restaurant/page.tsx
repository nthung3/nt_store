import { MainLayout } from '@/components/layouts/main-layout';
import ShopContent from '@/components/shop/shop-content';

export default function RestaurantPage(): JSX.Element {
    return (
        <MainLayout showNavbar showFooter>
            <ShopContent />
        </MainLayout>
    );
}
