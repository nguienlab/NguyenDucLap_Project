import { createContext, useState, useContext } from 'react';

const ProductDetailContext = createContext();

export const useProductDetail = () => useContext(ProductDetailContext);

export const ProductDetailProvider = ({ children }) => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const openPanel = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const closePanel = () => {
        setSelectedVehicle(null);
    };

    const value = {
        vehicle: selectedVehicle,
        isPanelOpen: !!selectedVehicle,
        openPanel,
        closePanel
    };

    return (
        <ProductDetailContext.Provider value={value}>
            {children}
        </ProductDetailContext.Provider>
    );
};
