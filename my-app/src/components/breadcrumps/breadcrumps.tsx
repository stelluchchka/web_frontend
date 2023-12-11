import { Link } from "react-router-dom";
import styles from './breadcrumps.module.scss'

export type BreadcrumpsProps = {
  links: Map<string, string>;
}

const Breadcrumps: React.FC<BreadcrumpsProps> = ({links}) => {
  return (
    <div className={styles.breadcrumbs}>
    <span className={styles['breadcrumbs__item-icon']}>🍔</span>
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