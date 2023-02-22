import React, { useState, useEffect } from 'react'



const EffectStuff = ({ beer }) => {
    const [count, setCount ] = useState(0)
    const [ countTwo, setCount2 ] = useState(0)

    useEffect(() => {
        console.log('This is running as component mounts')
    },[])


    useEffect(() => {
        console.log('sthu')
    })

    useEffect(() => {
        console.log('The component updated')
        setCount2(countTwo + 2)
        // startTimer()

    },[count])


    const startTimer = () => {
        setTimeout(() => {
            setCount2(countTwo + 1)

        },5000)
    }

    return (
        <>
            <div>Hello</div>
            <p>{count}</p>
            <p>{countTwo}</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </>
    )
}


export default EffectStuff