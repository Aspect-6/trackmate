import type { Landing } from "@/pages/Landing/types"

const Header: React.FC<Landing.HeaderProps> = ({ children }) => {
    return (
        <header style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "4rem",
        }}>
            {children}
        </header>
    )
}

export default Header
