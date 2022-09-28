import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategoriesStart } from '../../store/categories/category.action';
//import { fetchCategoriesAsync } from '../../store/categories/category.action';

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategoriesStart())
        // for redux-thunk
        // dispatch(fetchCategoriesAsync())
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=':category' element={<Category />}/>
        </Routes>
    )
} 

export default Shop;