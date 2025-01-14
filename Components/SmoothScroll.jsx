import { useEffect, useState } from 'react';

export default function SmoothScroll({ children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return <>{children}</>;
}