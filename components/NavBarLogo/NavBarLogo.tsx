import css from './NavBarLogo.module.css'
const NavBarLogo = () => { 
    return (
        <div className={css.logoBlock}>
          <svg className={css.logoSvg} width={30} height={30}>
            <use href="/icons/header-icons.svg#icon-logo"></use>
            </svg>
            
          <svg  width={32} height={32}>
            <use href="/icons/header-icons.svg#icon-leleka-logo"></use>
          </svg>
        </div>
    )
};

export default NavBarLogo;