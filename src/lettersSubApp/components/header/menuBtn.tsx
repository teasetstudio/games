type TMenuBtn = {
    menuToggle(p: boolean): void
}
const MenuBtn = ({menuToggle}: TMenuBtn) => {
    return (
        <button className='menu-btn'
            onMouseOver={() => menuToggle(true)}>
                Mеню
        </button>

    )
}

export default MenuBtn
