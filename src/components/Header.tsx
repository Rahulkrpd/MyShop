import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'


export default function Header() {
    const { totalItems } = useCart()
    return (
        <header className="p-4 shadow-md flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">My Shop</Link>
            <Link to="/cart" className="relative">
                <Button>
                <img src="/icons8-cart-96.png" alt="cart image" className='w-7' />
                </Button>
                

                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                        {totalItems}
                    </span>
                )}
            </Link>
        </header>
    )
}