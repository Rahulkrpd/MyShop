import { useParams, useNavigate } from 'react-router-dom'
import { Loader, Error } from '@/components/Loader'
import { Button } from './ui/button'
import { useStore } from '@/context/StoreContext' // <-- make sure this path is correct

export default function ProductPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { products, loading, error } = useStore()

    const product = products.find((p) => p.id === Number(id))

    if (loading) return <Loader />
    if (error) return <Error message={error} />
    if (!product) return <Error message="Product not found" />

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-contain  p-4 rounded-xl mix-blend-multiply "
                />
                <div>
                    <h2 className="text-2xl font-bold">{product.title}</h2>
                    <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
                    <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                    <p className="mt-4 text-gray-700">{product.description}</p>
                    <p className="mt-4 text-sm text-gray-500">
                        ⭐ {product.rating.rate} ({product.rating.count} reviews)
                    </p>
                </div>
            </div>

            <div className=' w-full flex justify-center'>
                <Button onClick={() => navigate(-1)} className='cursor-pointer' >
                    ⬅ Back
                </Button>
            </div>

        </div>
    )
}
