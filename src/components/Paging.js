import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const Paging = ({currentPage, totalPage, setCurrentPage, pageChange}) => {
  return (
     <Pagination>
      <Pagination.Prev onClick={() => pageChange(-1)}/>
      <Pagination.Item>{`${currentPage} of ${totalPage}`}</Pagination.Item>
      <Pagination.Next onClick={() => pageChange(1)}/>
    </Pagination>
  )
}

export default Paging