#css
/* dynamic pagination */
.break{
    background-color: #F0F0F0;
    position: relative;
    height: 31px;
    width: 31px;
    border-radius: 3px;
}
.break a{
    position: absolute;
    top: 6px;
    left: 8px;
    font-weight: bold !important;
    color: #9C9C9C;
}
.custom-custom-number{
    min-width: 31px;
    min-height: 31px;
}
.disabled-svg-path{
    fill: red !important;
}
.barcode svg{
    height: 100px !important;
    margin-top: 10px !important;
}


#componetnt
import { PaginationLeftIcon, PaginationRightIcon } from "@/assets/icons";
import ReactPaginate from "react-paginate";
export default function DynamicPagination({ totalPage, handlePageClick }) {
    return (
        <>
            <ReactPaginate
                breakLabel={'...'}
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={totalPage}
                previousLabel={<PaginationLeftIcon />}
                nextLabel={<PaginationRightIcon />}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center select-none justify-end gap-x-[4px]"
                breakLinkClassName=" flex font-bold w-[10px] h-[10px] flex items-center justify-center"
                activeLinkClassName="bg-special w-[25px] h-[25px] flex text-white rounded-[1.6px] items-center justify-center"
                pageLinkClassName="bg-[#F0F0F0] px-2 custom-custom-number text-[#9C9C9C] flex rounded-[1px] font-medium items-center justify-center"
            />
        </>
    );
}


#icon
export const PaginationRightIcon = () => {
   return (
       <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect x="0.109375" width="31.8919" height="31" rx="1.06623" fill="#F0F0F0" />
           <path d="M13.4836 9.30469L19.6562 15.5047L13.4836 21.7047" stroke="#F97316" strokeWidth="2.13245" />
       </svg>
   )
}

export const PaginationLeftIcon = () => {
    return (
        <svg width="32" className="pagination-left-icon" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="31.8919" height="31" rx="1.06623" fill="#F0F0F0" />
            <path d="M19.5476 9.30469L13.375 15.5047L19.5476 21.7047" stroke="#C7C9CC" strokeWidth="2.13245" />
        </svg>

    )
}
