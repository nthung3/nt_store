import ProductForm from '@/components/admin/product-form';

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default function EditProductPage({ params }: EditProductPageProps): JSX.Element {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            <ProductForm productId={params.id} />
        </div>
    );
}
