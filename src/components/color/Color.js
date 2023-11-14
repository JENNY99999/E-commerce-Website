import React, { useState } from 'react';
import './color.css';



const Color = ({ colorData, setColor }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const handleColorClick = (colorId) => {
        setSelectedColor(colorId === selectedColor ? null : colorId);
        setColor(colorId);
    };
    return (
        <>
            <ul className='color-selection'>
                {colorData &&
                    colorData?.map((color) => (
                        <li
                            onClick={() => handleColorClick(color?._id)}
                            key={color?._id}
                            className={`color-item ${selectedColor === color?._id ? 'selected' : ''}`}
                            style={{
                                backgroundColor: `${color?.title}`,
                                transform: selectedColor === color?._id ? 'scale(1.1)' : 'scale(1)',
                            }}
                        >

                            {selectedColor === color?._id && (
                                <div className='checkmark'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='32'
                                        height='32'
                                        fill='white'
                                        className='bi bi-check'
                                        viewBox='0 0 16 16'
                                    >
                                        <path d='M13.646 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L6 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
                                    </svg>
                                </div>
                            )}

                        </li>
                    ))}
            </ul>
        </>
    );
};

export default Color;









