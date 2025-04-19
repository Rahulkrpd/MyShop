import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
    useMemo,
} from 'react'

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: { rate: number; count: number }
}

interface StoreContextType {
    products: Product[]
    filtered: Product[]
    categories: string[]
    selectedCategory: string
    setSelectedCategory: (c: string) => void
    searchQuery: string
    setSearchQuery: (q: string) => void
    loading: boolean
    error: string | null
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function useStore() {
    const ctx = useContext(StoreContext)
    if (!ctx) throw new Error('useStore must be inside StoreProvider')
    return ctx
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    // 1) On mount: load from localStorage or fetch API
    useEffect(() => {
        const cached = localStorage.getItem('products')
        if (cached) {
            setProducts(JSON.parse(cached))
            setLoading(false)
        } else {
            fetch('https://fakestoreapi.com/products')
                .then((res) => {
                    if (!res.ok) throw new Error('Network error')
                    return res.json() as Promise<Product[]>
                })
                .then((data) => {
                    setProducts(data)
                    localStorage.setItem('products', JSON.stringify(data))
                })
                .catch(() => setError('Failed to load products'))
                .finally(() => setLoading(false))
        }
    }, [])
    // (caching: check localStorage first, else fetch & store) :contentReference[oaicite:0]{index=0}

    // 2) Derive unique categories
    const categories = useMemo(
        () => Array.from(new Set(products.map((p) => p.category))),
        [products]
    )
    // (extract categories) :contentReference[oaicite:1]{index=1}

    // 3) Apply filter + search
    const filtered = useMemo(() => {
        return products.filter((p) => {
            return (
                (selectedCategory === '' || p.category === selectedCategory) &&
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })
    }, [products, selectedCategory, searchQuery])
    // (filtering via useMemo) :contentReference[oaicite:2]{index=2}

    return (
        <StoreContext.Provider
            value={{
                products,
                filtered,
                categories,
                selectedCategory,
                setSelectedCategory,
                searchQuery,
                setSearchQuery,
                loading,
                error,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}
