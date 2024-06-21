import { FidgetSpinner } from "react-loader-spinner";

export const LoadingSpinner = () => {
    return <FidgetSpinner
        visible={true}
        height="5rem"
        width="5rem"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        zIndex: 1000
        }}
        wrapperClass="fidget-spinner-wrapper"
    />
}