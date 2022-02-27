import React from 'react'
import './styles.css'
import { useTimerContext } from '../hooks/TimerContext'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

export const ModalUser = () => {
    const { isModalOpen, user, handleCloseModal } = useTimerContext()
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid gray',
        borderRadius: '4px',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div className='Modal'>

        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
        >
            <Box sx={style}>
                <h1>{user[0].name}</h1>
                <div className='boxScroll'>
                    {user.map((laps: any, index: any) => (
                        <div key={index}>
                            <div>
                                ID: {laps.id}
                            </div>
                            {laps.laps.map((lap: any, index: any) => (
                                <div className='elementLap' key={index}>
                                    <div>
                                        Lap {laps.laps.length - index}
                                    </div>
                                    <div>
                                        {lap}
                                    </div>
                                </div>))}
                        </div>
                    ))}
                </div>
            </Box>
        </Modal>

        </div>
    )
}


