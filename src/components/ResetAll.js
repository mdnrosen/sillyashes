import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Reset = () => {
    const navigate = useNavigate('/')


    const handleReset = () => {
        window.localStorage.clear()
        navigate('/')
    }
    

    return (
        <Button onClick={handleReset}>Reset local storage</Button>
    )
}


