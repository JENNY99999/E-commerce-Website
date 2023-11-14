import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/product-card/ProductCard';
import './shop.css';
import Button from 'react-bootstrap/Button';
import Meta from '../../components/meta/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/products/productSlice';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';




const Shop = () => {
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();
    const productState = useSelector((state) => state?.product?.products);

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

    //filter values
    function valuetext(value) {
        return `${value}`;
    }

    //filter modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //filter price slider
    const [value, setValue] = React.useState([67, 674]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
    };
    const [brands, setBrands] = useState([]);

    //Filter State
    const [brand, setBrand] = useState(null);
    const [minPrice, setMinPrice] = useState(67)
    const [maxPrice, setMaxPrice] = useState(674)
    const [sort, setSort] = useState(null)
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [isReset, setIsReset] = useState(true);


    useEffect(() => {
        let newBrand = [];

        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            newBrand.push(element?.brand);
        }
        setBrands(newBrand);
    }, [productState]);
    useEffect(() => {
        dispatch(getAllProducts({ sort, brand, minPrice, maxPrice }));
    }, [dispatch, sort, brand, minPrice, maxPrice]);
    const brandSet = new Set(brands);


    useEffect(() => {
        if (!showAll && productState) {
            setDisplayedProducts(productState.slice(0, 12));
        } else {
            setDisplayedProducts(productState);
        }
    }, [productState, showAll]);

    const handleLoadMore = () => {
        setDisplayedProducts(productState);
        setShowAll(true);
    };


    const handleBrandDelete = (deletedBrand) => {
        setSelectedBrands((prevBrands) =>
            prevBrands.filter((brand) => brand !== deletedBrand)
        );
        if (selectedBrands.length === 0) {
            setBrand(null);
        }
    };

    const getDisplayText = (value) => {
        switch (value) {
            case "title":
                return "Name Ascending A - Z";
            case "-title":
                return "Name Descending Z - A";
            case "price":
                return "Price Low - High";
            case "-price":
                return "Price High - Low";
            default:
                return value;
        }
    };

    const handleSortChange = (e) => {

        setSelectedSortOption(e.target.value);
        setSort(e.target.value)
    };
    const handleFilterApply = () => {
        handleClose();
        setIsReset(false)
    };


    const handleResetFilters = () => {
        // reset filter 
        setBrand(null);
        setMinPrice(67);
        setMaxPrice(674);
        setSort(null);
        setSelectedBrands([]);
        setSelectedSortOption(null);

        dispatch(getAllProducts({
            brand: null,
            minPrice: 67,
            maxPrice: 674,
            sort: null,
        }));

        // close modal
        handleClose();
        setIsReset(true);
    };

    return (
        <>
            <Meta title={'Shop | Salinaka'} />
            <main className="content">
                <div className="product-wrapper">
                    <div className="  row">
                        <div className='col-1 d-flex-center'>
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
                                                        <select
                                                            defaultValue={"All Brands"}
                                                            name=""
                                                            id=""
                                                            className='filters-brand'
                                                            onChange={(e) => { setBrand(e.target.value) }}
                                                        >
                                                            <option value="">All Brands</option>
                                                            {brandSet &&
                                                                Array.from(brandSet).map((brandItem, index) => (
                                                                    <option
                                                                        key={index}
                                                                    >
                                                                        {brandItem}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className="filters-field">
                                                        <span>Sort By</span>
                                                        <br />
                                                        <br />
                                                        <select
                                                            defaultValue={"None"}
                                                            name=""
                                                            id=""
                                                            className='filters-sort-by d-block'
                                                            onChange={handleSortChange}
                                                        >
                                                            <option value="">None</option>
                                                            <option value="title">Name Ascending A - Z</option>
                                                            <option value="-title">Name Descending Z - A</option>
                                                            <option value="price">Price Low - High</option>
                                                            <option value="-price">Price High - Low</option>

                                                        </select>
                                                    </div>
                                                    <div className="filters-field">
                                                        <span>Price Range</span>
                                                        <br />
                                                        <br />
                                                        <div className='price-box'>
                                                            <div className="price-range-control">
                                                                <input
                                                                    className="price-range-input"
                                                                    max={maxPrice}
                                                                    min={minPrice}
                                                                    type="number"
                                                                    readOnly=""
                                                                    value={minPrice}
                                                                />
                                                                —
                                                                <input
                                                                    className="price-range-input"
                                                                    max={maxPrice}
                                                                    min={minPrice}
                                                                    type="number"
                                                                    readOnly=""
                                                                    value={maxPrice}
                                                                />
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
                                                        <button
                                                            className="filters-button button button-small"
                                                            type="button"
                                                            onClick={handleFilterApply}
                                                        >
                                                            Apply filters
                                                        </button>
                                                        <button
                                                            className="filters-button button button-border button-small"
                                                            type="button"
                                                            onClick={handleResetFilters}
                                                        >
                                                            Reset filters
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                </Fade>
                            </Modal>
                        </div >

                        <div className=" col-11 d-flex-center">
                            {
                                <Stack direction="row" spacing={1}>
                                    {
                                        !isReset && brandSet.size === 1 ?
                                            (Array.from(brandSet).map((brandItem, index) => (
                                                <Chip
                                                    key={index}
                                                    label={brandItem}
                                                    onDelete={() => handleBrandDelete(brandItem)}
                                                />
                                            ))) :
                                            ""
                                    }

                                    {!isReset && selectedSortOption !== null && (
                                        <Chip
                                            key={selectedSortOption} // Set a unique key based on the selected option
                                            label={getDisplayText(selectedSortOption)} // Use a function to get the display text
                                            onDelete={() => setSelectedSortOption(null)}
                                        />
                                    )}

                                    {!isReset && (minPrice !== 67 || maxPrice !== 674) ? (
                                        <Chip
                                            label={`${minPrice} - ${maxPrice}`}
                                            onDelete={() => {
                                                setMinPrice(67); // Reset the min price
                                                setMaxPrice(674); // Reset the max price
                                            }}
                                        />
                                    ) : null}

                                </Stack>
                            }
                        </div>
                    </div>
                    <div className="product-list">
                        {[...displayedProducts].map((product) => (
                            <ProductCard
                                products={product}
                                key={product?._id} />
                        ))}
                    </div>

                    {!showAll && (
                        <div className="product-btn">
                            <Button
                                className="button button-small"
                                type="button"
                                onClick={handleLoadMore}
                            >
                                Load More Items
                            </Button>
                        </div>
                    )}
                </div>

            </main >
        </>
    );
};

export default Shop;



















