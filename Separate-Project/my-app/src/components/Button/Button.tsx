import { Button, ButtonProps } from '@mui/material'
import React, { ElementType, MouseEventHandler, ReactNode } from 'react'

export interface BaseButtonProps {
    className?: string
    children?: ReactNode
    loading?: boolean
    component?: any
}

type HTMLButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
} & BaseButtonProps

/**
 * If href is supplied, button becomes an anchor link
 */
type HTMLAnchorProps = {
    href?: string
} & BaseButtonProps

/**
 * If `as` is supplied, button becomes a custom html node specified in `as`
 */
type CustomNodeProps = {
    as?: ElementType
    to?: string
} & BaseButtonProps

export type CustomButtonProps = HTMLButtonProps &
    HTMLAnchorProps &
    CustomNodeProps &
    BaseButtonProps &
    ButtonProps

/**
 * Primary UI component for user interaction
 */

const CustomButton: React.ForwardRefRenderFunction<unknown, CustomButtonProps> = (
    props,
    ref
) => {
    const {
        className,
        children,
        component,
        onClick,
        // loading = false,
        // as,
        // to
    } = props
    // const type = "primary"
    //   ? "storybook-button--primary"
    //   : "storybook-button--secondary";

    return (
        <Button
            className={className}
            onClick={onClick}
            component={component}
            {...props}
        >
            {children}
        </Button>
    )
}
export default React.forwardRef<unknown, ButtonProps>(CustomButton)
