import React from 'react';
import { NavLink } from "react-router-dom";

const SidebarLinks = ({ categories, handleCategoryClick, currentUrl }) => {
  let Categories = (categories) ?
    (
      categories.map(category => {
        let url = `${currentUrl}&category=${category.name}`
        return (
          <NavLink to={url} className="collection-item ci" onClick={() => { handleCategoryClick(category.category_id) }} key={category.category_id}>{category.name}</NavLink>
        );
      })
    ) : null;
  return (
    <div>{Categories}</div>
  );
}


export default SidebarLinks;