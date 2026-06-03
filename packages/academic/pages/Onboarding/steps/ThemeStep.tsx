import React from "react"
import { useSettings } from "@/app/hooks/useSettings"
import { Moon, Sun } from "lucide-react"
import { ModalSubmitButton } from "@shared/components/modal"
import { GLOBAL } from "@/app/styles/colors"

interface ThemeStepProps {
    onNext: () => void
}

export const ThemeStep: React.FC<ThemeStepProps> = ({ onNext }) => {
    const { theme, setTheme } = useSettings()

    return (
        <div className="flex flex-col animate-slide-up-fade">
            <h1 className="text-3xl font-bold mb-2" style={{ color: GLOBAL.TEXT_PRIMARY }}>
                Choose your theme
            </h1>
            <p className="text-lg mb-8" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                Select a theme for your application. You can always change this later in settings.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${
                        theme === "light" 
                            ? "border-blue-500 shadow-md" 
                            : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                    }`}
                    style={{ backgroundColor: GLOBAL.BACKGROUND_SECONDARY }}
                >
                    <Sun size={48} className="mb-4" style={{ color: GLOBAL.TEXT_PRIMARY }} />
                    <span className="text-xl font-medium" style={{ color: GLOBAL.TEXT_PRIMARY }}>Light Mode</span>
                </button>
                
                <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all ${
                        theme === "dark" 
                            ? "border-blue-500 shadow-md" 
                            : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-600"
                    }`}
                    style={{ backgroundColor: GLOBAL.BACKGROUND_SECONDARY }}
                >
                    <Moon size={48} className="mb-4" style={{ color: GLOBAL.TEXT_PRIMARY }} />
                    <span className="text-xl font-medium" style={{ color: GLOBAL.TEXT_PRIMARY }}>Dark Mode</span>
                </button>
            </div>

            <div className="flex justify-end">
                <ModalSubmitButton
                    type="button"
                    onClick={onNext}
                    bgColor={GLOBAL.ADDITEM_BUTTON_BG}
                    bgColorHover={GLOBAL.ADDITEM_BUTTON_BG_HOVER}
                    textColor={GLOBAL.TEXT_WHITE}
                >
                    Next Step
                </ModalSubmitButton>
            </div>
        </div>
    )
}
