import { useLocation } from "react-router-dom"
import { PATHS } from "@/app/config/paths"
import { GLOBAL, MY_CLASSES } from "@/app/styles/colors"

export type HeaderActionConfig = {
    modal: "add-class" | "add-assignment" | "assignment-kind-chooser" | "add-event" | "type-selector"
    label: string
    bg: string
    bgHover: string
}

export const useHeaderAction = (): HeaderActionConfig => {
    const location = useLocation()

    if (location.pathname === PATHS["my-classes"]) {
        return {
            modal: "add-class",
            label: "Add Class",
            bg: MY_CLASSES.CLASS_BUTTON_BG,
            bgHover: MY_CLASSES.CLASS_BUTTON_BG_HOVER
        }
    }
    if (location.pathname === PATHS["my-assignments"]) {
        return {
            modal: "assignment-kind-chooser",
            label: "Add Assignment",
            bg: GLOBAL.ASSIGNMENT_BUTTON_BG,
            bgHover: GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER
        }
    }
    return {
        modal: "type-selector",
        label: "Add Item",
        bg: GLOBAL.ADDITEM_BUTTON_BG,
        bgHover: GLOBAL.ADDITEM_BUTTON_BG_HOVER
    }
}
