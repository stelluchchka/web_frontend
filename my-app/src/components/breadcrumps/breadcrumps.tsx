import { Link } from "react-router-dom";
import React from 'react'
import styles from "./breadcrumps.module.scss";

export type BreadCrumbsProps = {
  links: Map<string, string>;
}

const Breadcrumps: React.FC<BreadCrumbsProps> = ({links}) => {
    return (
      <div style={{textAlign: 'left', marginTop: '10px', marginLeft: '10px'}}>
      {Array.from(links.entries()).map(([key, value], index) => (
        <span
            key={key}
            className={`${styles.breadcrumbs__item} ${index === links.size - 1 ? styles['breadcrumbs__item-last'] : ''}`}
          >
          <Link className={`${styles['breadcrumbs__item-link']} ${index === links.size - 1 ? styles['breadcrumbs__item-last'] : ''}`} to={value}>
            {key}
          </Link>
          {index !== links.size - 1 && 
          <span className={styles['breadcrumbs__item-icon']}>/</span>}
        
        </span>
      ))}
    </div>
    )
  }
export default Breadcrumps;