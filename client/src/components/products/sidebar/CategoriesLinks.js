import React from 'react';
import { NavLink } from "react-router-dom";

const SidebarLinks = ({ categories, handleCategoryClick, currentUrl }) => {
  let Categories = (categories) ?
    (
      categories.map(category => {
        let url = `${currentUrl}&category=${category.category_id}`
        return (
          <NavLink to={url} className="collection-item ci catgry" onClick={() => { handleCategoryClick(category.category_id) }} key={category.category_id}>{category.name}</NavLink>
        );
      })
    ) : null;
  return (
    <div>{Categories}</div>
  );
}


export default SidebarLinks;