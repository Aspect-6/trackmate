import React, { useRef, useState, useEffect } from "react"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"

const DEFAULT_CARD_HEIGHT = 150
const MAX_VISIBLE_CARDS = 3
const EMPTY_STATE_MIN_HEIGHT = 60
const LIST_BOTTOM_PADDING = 12

const AssignmentBoardBody: React.FC<AssignmentBoardTypes.Body.Props> = ({
  status,
  itemsInView,
  isMobile,
  isCollapsed,
  isOver,
  droppableRef,
  children,
}) => {
  // Animation & Resize Refs
  const listRef = useRef<HTMLDivElement>(null)
  const animationInitializedRef = useRef(false)
  const [contentMaxHeight, setContentMaxHeight] = useState(
    EMPTY_STATE_MIN_HEIGHT,
  )
  const [shouldAnimate, setShouldAnimate] = useState(!isMobile)

  const contentId = `assignments-${status.replace(/\s+/g, "-").toLowerCase()}`
  const isListHidden = isMobile && isCollapsed

  // Animation Logic
  useEffect(() => {
    if (!isMobile) {
      setShouldAnimate(true)
      animationInitializedRef.current = true
    } else {
      setShouldAnimate(false)
      animationInitializedRef.current = false
    }
  }, [isMobile])

  useEffect(() => {
    const computeContentHeight = () => {
      if (!isMobile) {
        setContentMaxHeight(EMPTY_STATE_MIN_HEIGHT)
        return
      }

      const cardElements =
        listRef.current?.querySelectorAll(".assignments-item") ?? []
      const visibleCards = Math.min(
        MAX_VISIBLE_CARDS,
        Math.min(cardElements.length, itemsInView.length),
      )

      let cardsHeight = 0
      if (visibleCards > 0) {
        const first = cardElements[0] as HTMLElement | undefined
        const target = cardElements[visibleCards - 1] as HTMLElement | undefined
        if (first && target) {
          cardsHeight = target.offsetTop - first.offsetTop + target.offsetHeight
        }
      }

      if (visibleCards === 0) {
        setContentMaxHeight(EMPTY_STATE_MIN_HEIGHT)
      } else {
        const fallbackCardsHeight = visibleCards * DEFAULT_CARD_HEIGHT
        const targetCardsHeight = cardsHeight || fallbackCardsHeight
        setContentMaxHeight(targetCardsHeight + LIST_BOTTOM_PADDING)
      }

      if (!animationInitializedRef.current && isMobile) {
        animationInitializedRef.current = true
        if (
          typeof window !== "undefined" &&
          typeof window.requestAnimationFrame === "function"
        ) {
          window.requestAnimationFrame(() => setShouldAnimate(true))
        } else {
          setShouldAnimate(true)
        }
      }
    }

    computeContentHeight()

    if (!isMobile) {
      return
    }

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => computeContentHeight())
      if (listRef.current) observer.observe(listRef.current)
      return () => observer.disconnect()
    }

    window.addEventListener("resize", computeContentHeight)
    return () => window.removeEventListener("resize", computeContentHeight)
  }, [itemsInView, isMobile])

  return (
    <div
      className="assignments-collapse-outer flex-grow"
      data-animate={!isMobile || shouldAnimate ? "true" : "false"}
      style={{
        maxHeight: isMobile
          ? isListHidden
            ? "0px"
            : `${contentMaxHeight}px`
          : "none",
        overflow: isMobile ? "hidden" : "visible",
      }}
    >
      <div
        ref={(node) => {
          droppableRef(node)
          listRef.current = node
        }}
        id={contentId}
        className="assignment-list h-full space-y-3 overflow-y-auto custom-scrollbar"
        data-over={isOver ? "true" : "false"}
        style={{
          minHeight:
            itemsInView.length === 0
              ? `${EMPTY_STATE_MIN_HEIGHT}px`
              : undefined,
          paddingBottom:
            isMobile && itemsInView.length > 0
              ? `${LIST_BOTTOM_PADDING}px`
              : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default AssignmentBoardBody
