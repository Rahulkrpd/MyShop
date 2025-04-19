import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/context/StoreContext'
import { Button } from './ui/button'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"




type Props = { product: Product }

export default function ProductCard({ product }: Props) {
    const { addToCart } = useCart()
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/product/${product.id}`)
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation()
        addToCart(product)



        toast.success("Added to cart")


    }



    return (
        <Card
            onClick={handleCardClick}
            className="hover:shadow-xl transition cursor-pointer h-96 flex flex-col justify-between  bg-transparent  border border-solid border-purple-800"
        >
            <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain mix-blend-multiply"
            />
            <CardContent className="flex-1 flex flex-col justify-between">
                <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                <p className="mt-2">${product.price}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button
                    onClick={handleAddToCart}

                    className="px-3 py-1 bg-[#695082] text-white rounded cursor-pointer"
                >
                    Add to Cart
                    <Toaster />
                </Button>

            </CardFooter>
        </Card>
    )
}
