import {cn} from "@/lib/utils/cn";

type ContainerProps = {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children: React.ReactNode;
};

export function Container({as: Tag = "div", className, children}: ContainerProps) {
    const Component = Tag as React.ElementType;
    return (
        <Component
            className={cn(
                "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8",
                className,
            )}
        >
            {children}
        </Component>
    );
}
