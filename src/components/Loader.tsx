export function Loader() {
    return <div className="text-center p-4">Loading…</div>
}
export function Error({ message }: { message: string }) {
    return <div className="text-center p-4 text-red-600">{message}</div>
}