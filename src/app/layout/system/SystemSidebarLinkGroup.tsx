import { ReactNode, useState } from 'react';

interface SystemSidebarLinkGroupProps {
    children: (handleClick: () => void, open: boolean) => ReactNode;
    activeCondition: boolean;
}

const SystemSidebarLinkGroup = ({
                                    children,
                                    activeCondition,
                                }: SystemSidebarLinkGroupProps) => {
    const [open, setOpen] = useState<boolean>(activeCondition);

    const handleClick = () => {
        setOpen(!open);
    };

    return <li className="list-none">{children(handleClick, open)}</li>;
};

export default SystemSidebarLinkGroup;
