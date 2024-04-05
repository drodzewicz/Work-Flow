import { useState } from "react";


const useSearchFilter = (initialValue: string = "") => {
    const [searchTerm, setSearchTerm] = useState<string>(initialValue);

    const search = (value: string) => {
        setSearchTerm(value);
    } 

    const clear = () => {
        setSearchTerm("");
    } 

    return { searchTerm, search, clear };
}

export default useSearchFilter;