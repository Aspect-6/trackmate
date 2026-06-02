import React from "react"
import { useSettings } from "@/app/hooks/useSettings"
import { Sun, Moon } from "lucide-react"
import { BaseModuleHeader, BaseModuleDescription } from "@/pages/Settings/components/BaseModule"
import ThemeButton from "./ThemeButton"
import { SETTINGS } from "@/app/styles/colors"

const ThemeSettingsComponent: React.FC = () => {
    const { theme, setTheme } = useSettings()

    return (
        <div
            className="p-6 rounded-xl mb-6 shadow-md"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            <BaseModuleHeader title="Theme" className="mb-4" />
            <BaseModuleDescription>
                Choose the color theme TrackMate should use across the entire app.
            </BaseModuleDescription>

            <div className="theme-toggle grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ThemeButton
                    label="Light Mode"
                    description="Bright, paper-like interface"
                    Icon={Sun}
                    active={theme === "light"}
                    onClick={() => setTheme("light")}
                />
                <ThemeButton
                    label="Dark Mode"
                    description="Soft glow for relaxed eyes."
                    Icon={Moon}
                    active={theme === "dark"}
                    onClick={() => setTheme("dark")}
                />
            </div>
        </div>
    )
}

export default ThemeSettingsComponent