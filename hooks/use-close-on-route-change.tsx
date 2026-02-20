"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

const useCloseOnRouterChange = (closeFunction: () => void) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouterChange = () => {
            closeFunction();
        };

        router.events.on("routeChangeComplete", handleRouterChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouterChange);
        };
    }), [router, closeFunction];
};

export default useCloseOnRouterChange;