import { useStore } from '@/context/StoreContext'
import ProductCard from '@/components/ProductCard'
import { Loader, Error } from '@/components/Loader'

export default function Home() {
    const {
        filtered,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        loading,
        error,
    } = useStore()

    if (loading) return <Loader />
    if (error) return <Error message={error} />

    return (
        <main className="p-4 ">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded hover:border-purple-800 cursor-pointer bg-transparent"
                >
                    <option value="" className='bg-transparent'>All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-purple-300 rounded flex-1 "
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </main>
    )
}
