
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart()

    if (items.length === 0) {
        return <div className="p-8 text-center">Your cart is empty.</div>
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Cart ({totalItems} items)</h1>
            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 border p-4 rounded">
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-contain  mix-blend-multiply " />
                        <div className="flex-1">
                            <h2 className="font-semibold">{item.title}</h2>
                            <p>${item.price.toFixed(2)} each</p>
                            <div className="mt-2 flex items-center space-x-2">
                                <Button onClick={() => updateQuantity(item.id, -1)}>-</Button>
                                <span>{item.quantity}</span>
                                <Button onClick={() => updateQuantity(item.id, +1)}>+</Button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            <Button variant="destructive" onClick={() => removeFromCart(item.id)}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <Button onClick={clearCart} variant="secondary">Clear Cart</Button>
                <div className="text-xl font-bold">Grand Total: ${totalPrice.toFixed(2)}</div>
                <Button onClick={() => alert('Proceeding to checkout')} className="bg-green-600">Process to Checkout</Button>
            </div>
        </div>
    )
}
