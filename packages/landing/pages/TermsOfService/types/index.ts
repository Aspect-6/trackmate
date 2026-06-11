import React from "react"

export namespace TermsOfService {
    export interface Props { }
    // ======================
    
    export interface TermsSectionProps {
        id: string
        title: string
        sectionNumber?: number
        children: React.ReactNode
    }
    export interface TermsHeadingProps {
        children: React.ReactNode
    }
    export interface TermsParagraphProps {
        children: React.ReactNode
    }
    export interface TermsListProps {
        children: React.ReactNode
    }
    export interface TermsListItemProps {
        children: React.ReactNode
    }
    export interface TermsTableOfContentsProps {
        sections: { id: string; title: string; sectionNumber?: number }[]
    }
}
