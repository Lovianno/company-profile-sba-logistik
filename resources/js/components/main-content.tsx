import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MainContentProps {
    children: ReactNode;
    className?: string;
}

function MainContent({ children, className }: MainContentProps) {
    return <div className={cn(className)}>{children}</div>;
}

export default MainContent;
