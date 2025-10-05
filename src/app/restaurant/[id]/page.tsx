import { MainLayout } from '@/components/layouts/main-layout';
import DetailContent from '@/components/detail/detail-content';

interface DetailPageProps {
    params: {
        id: string;
    };
}

export default function DetailPage({ params }: DetailPageProps): JSX.Element {
    return (
        <MainLayout>
            <DetailContent id={params.id} />
        </MainLayout>
    );
}
