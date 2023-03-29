import HomeBanner from './components/homebanner';
import HomeBestQty from './components/homebestqty';
import HomeCustomer from './components/homecustomer';
import HomeMenu from './components/homemenu';
import HomeOurApp from './components/homeourapp';
import HomeWelcome from './components/homewelcome';

function Home() {
    return (
        <>
            <HomeBanner />
            <HomeBestQty />
            <HomeWelcome />
            <HomeMenu />
            <HomeOurApp />
            <HomeCustomer />
        </>
    );
}

export default Home;
