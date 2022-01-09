import {useLocation} from "react-router-dom";
import React from "react";

export const useUrlQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default useUrlQuery