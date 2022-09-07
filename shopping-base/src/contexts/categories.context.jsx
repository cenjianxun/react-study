import { createContext, useState, useEffect } from "react";
// import SHOT_DATA from '../shop-data.js'
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap:{},
})
    
export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({}) //用{}（空对象）代替[]（null）

    // 上传所有products的数据，只用上传一次
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOT_DATA)
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories')
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
        
    }, [])

    const value = { categoriesMap }
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
} 
