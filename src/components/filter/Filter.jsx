import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Slider from '@mui/material/Slider';
import './filter.css'



//filter modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 440,
    height: 460,
    bgcolor: 'rgba(255, 255, 255)',
    border: '1px solid rgb(204, 204, 204)',
    boxShadow: 15,
    p: 4,
};


//filter price slider
const marks = [
    {
        value: 100,
        label: '100',
    },
    {
        value: 200,
        label: '200',
    },
    {
        value: 300,
        label: '300',
    },
    {
        value: 400,
        label: '400',
    },
    {
        value: 500,
        label: '500',
    }, {
        value: 600,
        label: '600',
    },
];

function valuetext(value) {
    return `${value}`;
}

const Filter = () => {
    //filter modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //filter price slider
    const [value, setValue] = React.useState([67, 674]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className="filter">
                <button className='button button-grey button-small'
                    onClick={handleOpen}
                >  Filter&nbsp;
                    <span><svg viewBox="64 64 896 896" focusable="false" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z"></path></svg></span>
                </button>

            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: {
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        },
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} >

                        <div className='filters-toggle-sub'>
                            <div>
                                <div className="filters">
                                    <div className="filters-field">
                                        <span>Brand</span>
                                        <br />
                                        <br />
                                        <select name="" id="" className='filters-brand'>
                                            <option value="">All Brands</option>
                                            <option value="salt">Salt Maalat</option>
                                            <option value="betsin">Betsin Maalat</option>
                                            <option value="black">Black Kibal</option>
                                            <option value="sexbomb">Sexbomb</option>
                                        </select>

                                    </div>
                                    <div className="filters-field">
                                        <span>Sort By</span>
                                        <br />
                                        <br />
                                        <select name="" id="" className='filters-sort-by d-block'>
                                            <option value="">None</option>
                                            <option value="name-asc">Name Ascending A - Z</option>
                                            <option value="name-desc">Name Descending Z - A</option>
                                            <option value="price-desc">Price High - Low</option>
                                            <option value="price-asc">Price Low - High</option>
                                        </select>
                                    </div>
                                    <div className="filters-field">
                                        <span>Price Range</span>
                                        <br />
                                        <br />
                                        <div className='price-box'>
                                            <div className="price-range-control">
                                                <input className="price-range-input" max="674" min="67" type="number" readonly="" value="67" />
                                                —
                                                <input className="price-range-input" max="674" min="67" type="number" readonly="" value="674" />
                                            </div>
                                            <div className='price-slider'>
                                                <Box className='price-slider-box'>
                                                    <Slider
                                                        getAriaLabel={() => 'Price range'}
                                                        value={value}
                                                        onChange={handleChange}
                                                        getAriaValueText={valuetext}
                                                        defaultValue={[67, 674]}
                                                        step={1}
                                                        min={67}
                                                        max={674}
                                                        marks={marks}
                                                        valueLabelDisplay="auto"

                                                        sx={{
                                                            height: 14,
                                                            borderRadius: 7,
                                                            '& .MuiSlider-thumb': {
                                                                width: 24,
                                                                height: 24,
                                                                zIndex: 30
                                                            },
                                                            '& .MuiSlider-track': {
                                                                backgroundColor: 'rgb(255, 165, 0)',
                                                                border: 'none',
                                                            },
                                                            '& .MuiSlider-rail': {
                                                                backgroundColor: 'rgb(208, 208, 208)'
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="filters-action">
                                        <button className="filters-button button button-small" type="button">Apply filters</button>
                                        <button className="filters-button button button-border button-small" type="button">Reset filters</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}

export default Filter