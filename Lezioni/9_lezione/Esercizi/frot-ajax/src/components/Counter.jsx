import { useEffect, useState } from "react"



export const Counter = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log('ciao!');
            setValue(v => v + 1);
        }, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, []);


    return (
        <h1>{value}</h1>
    ) 
}