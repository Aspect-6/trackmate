import { Assignment, Event, NoSchoolPeriod, Class } from "@/app/types";

// Components
export namespace CalendarHeader {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export interface CalendarHeaderButtonProps {
        onClick: () => void;
    }
    export interface MonthTitleProps {
        period: string;
    }
}

export namespace CalendarBody {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export namespace Grid {
        export interface Props {
            children: React.ReactNode
        }
        // ======================

        export interface HeaderProps {
            backgroundColor: string;
            textColor: string;
        }
        export namespace Day {
            export interface Props {
                day: number;
                month: number;
                year: number;
                isToday: boolean;
                isSelected: boolean;
                noSchool?: NoSchoolPeriod;
                assignments: Assignment[];
                events: Event[];
                onSelectDate: (date: Date) => void;
                onAssignmentClick: (id: string) => void;
                onEventClick: (id: string) => void;
                getClassColor: (classId: string) => string;
            }
            // ======================

            export interface ContainerProps {
                year: number;
                month: number;
                day: number;
                isToday?: boolean;
                isSelected?: boolean;
                noSchool?: NoSchoolPeriod | undefined;
                onSelectDate: (d: Date) => void;
                children?: React.ReactNode;
            }
            export interface NumberProps {
                day: number;
                noSchool?: NoSchoolPeriod | undefined;
            }
            export namespace AssignmentList {
                export interface Props {
                    assignments: Assignment[];
                    getClassColor: (classId: string) => string;
                    onAssignmentClick: (id: string) => void;
                }
                // ======================
                export interface AssignmentItemProps {
                    assignment: Assignment;
                    color: string;
                    onClick: (id: string) => void;
                }
            }
            export namespace EventList {
                export interface Props {
                    events: Event[];
                    onEventClick: (id: string) => void;
                    hasAssignments?: boolean;
                }
                // ======================
                export interface EventItemProps {
                    event: Event;
                    onClick: (id: string) => void;
                }
            }
            export type MobileDot = { id: string; color: string };
            export interface MobileDotsProps {
                dots: MobileDot[];
            }
        }
        export interface EmptyDayProps { }
    }

    export namespace SidePanel {
        export interface Props {
            date: Date | null
            children: React.ReactNode
        }
        // ======================

        export namespace Header {
            export interface Props {
                children: React.ReactNode
            }
            // ======================
            export interface DateDisplayProps {
                children: React.ReactNode
            }
            export interface CloseButtonProps {
                onClick: () => void
                children: React.ReactNode
            }
        }
        export namespace Body {
            export interface Props {
                children: React.ReactNode
            }
            // ======================
            export namespace DayType {
                export interface Props {
                    noSchoolDay?: NoSchoolPeriod
                    dayType: "A" | "B" | null
                    onNoSchoolClick?: (id: string) => void
                    children?: React.ReactNode
                }
                // ======================
                export interface DisplayProps {
                    dayType?: "A" | "B" | null
                }
                export interface NoSchoolInfoProps {
                    noSchoolDay?: NoSchoolPeriod | null
                }
            }
            export namespace ClassList {
                export interface Props {
                    classes: (string | null)[]
                    getClassById: (id: string) => Class
                }
                // ======================
                export interface ClassItemProps {
                    classId: string
                    index: number
                    getClassById: Props["getClassById"]
                }
            }
            export namespace AssignmentList {
                export interface Props {
                    assignments: Assignment[]
                    getClassById: (id: string) => Class
                    onAssignmentClick: (id: string) => void
                }
                // ======================
                export interface AssignmentItemProps {
                    assignment: Assignment
                    getClassById: Props["getClassById"]
                    onAssignmentClick: Props["onAssignmentClick"]
                }
            }
            export namespace EventList {
                export interface Props {
                    events: Event[]
                    onEventClick: (id: string) => void
                }
                // ======================
                export interface EventItemProps {
                    event: Event
                    onEventClick: Props["onEventClick"]
                }
            }
        }
    }
}

export namespace UseSidePanel {
    export interface Data {
        date: Date
        dateString: string
        formattedDate: string
        noSchoolDay: NoSchoolPeriod | undefined
        dayType: "A" | "B" | null
        scheduleType: string | undefined
        dueAssignments: Assignment[]
        dayEvents: Event[]
    }
}

// Hooks
export namespace UseCalendar {
    interface BaseCalendarCell {
        key: string;
    }

    export interface EmptyCalendarCell extends BaseCalendarCell {
        type: "empty";
    }
    export interface DayCalendarCell extends BaseCalendarCell {
        type: "day";
        day: number;
        dateString: string;
        isToday: boolean;
        noSchool: NoSchoolPeriod | undefined;
        assignments: Assignment[];
        events: Event[];
    }
    export type CalendarCell = EmptyCalendarCell | DayCalendarCell;
}
