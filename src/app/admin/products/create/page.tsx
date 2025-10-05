import ProductForm from '@/components/admin/product-form';

export default function CreateProductPage(): JSX.Element {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
            <ProductForm />
        </div>
    );
}
