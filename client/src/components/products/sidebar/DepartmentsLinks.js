import React from 'react';
import { NavLink } from "react-router-dom";

const SidebarLinks = ({ departments, handleClick, props }) => {
  let Departments = (departments) ?
    (
      departments.map(department => {
        let url = `/shopmate/products?department=${department.department_id}`
        return (
          <NavLink to={url} className="collection-item ci" onClick={() => { handleClick(department.department_id, url) }} key={department.department_id}>{department.name}</NavLink>
        );
      })
    ) : null;
  return (
    <div>{Departments}</div>
  );
}

export default SidebarLinks;