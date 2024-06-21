/* eslint-disable react/prop-types */
import { Filter } from "./Filter"
import '../../styles/navbar.css'
export const Navbar = ( { setParams} ) => {


    return (
        <section className='navbar'>
            <Filter setParams={setParams} />
        </section>
    )

}