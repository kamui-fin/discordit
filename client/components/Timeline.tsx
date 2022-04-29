import cx from "classnames"
import styles from "../styles/Timeline.module.scss"

const TimelineItem = ({
    enabled,
    completed,
    end,
    id,
}: {
    enabled: boolean
    completed: boolean
    end: boolean
    id: number
}) => {
    return (
        <>
            <div
                className={cx(styles.circle, {
                    [cx(styles.purple, styles.noborder)]: enabled || completed,
                })}
            >
                {id}
            </div>
            {!end && (
                <>
                    <span
                        className={cx(styles.line, {
                            [styles.purple]: enabled || completed,
                        })}
                    />
                    {/* Active half if enabled */}
                    <span
                        className={cx(styles.line, {
                            [styles.purple]: completed,
                        })}
                    />
                </>
            )}
        </>
    )
}

const Timeline = ({
    length,
    completedSteps,
    className,
}: {
    length: number
    completedSteps: number
    className: string
}) => {
    return (
        <div className={cx(styles.timeline, className)}>
            {[...Array(length).keys()].map((num) => {
                return (
                    <TimelineItem
                        enabled={num + 1 === completedSteps}
                        completed={num + 1 < completedSteps}
                        end={num + 1 == length}
                        id={num + 1}
                    />
                )
            })}
        </div>
    )
}

export default Timeline
