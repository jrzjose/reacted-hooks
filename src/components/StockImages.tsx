import * as React from 'react'
import List from "./List"
import { useMediaContext } from "../context/AppContext"
import { useAuthContext } from "../context/AuthContext"

const StockImages: React.FC = () => {
    const { state } = useMediaContext();
    const { currentUser } = useAuthContext();

    const items = React.useMemo(() => {
        const filtered = state.items.filter(item => {
            const username = currentUser?.displayName.split(" ").join("");
            return item.user === username?.toLowerCase();
        })
        return currentUser ? filtered : []
    }, [state.items, currentUser])

    return (
        <>
            <h1>My Stock Images</h1>
            <List items={items} />
        </>
    )
}
export default StockImages