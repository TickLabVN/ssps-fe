export const ToggleSidebarBtn: Component<{ open: boolean }> = ({ open }) => {
  return open ? (
    <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='keyboard_double_arrow_left'>
        <g id='Vector'>
          <path
            d='M20.5217 21L22.1667 19.355L16.8234 14L22.1667 8.645L20.5217 7L13.5217 14L20.5217 21Z'
            fill='#495057'
          />
          <path
            d='M12.8334 21L14.4784 19.355L9.13504 14L14.4784 8.645L12.8334 7L5.83337 14L12.8334 21Z'
            fill='#495057'
          />
        </g>
      </g>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'>
      <path
        d='M4.66675 7H23.3334H4.66675ZM4.66675 14H23.3334H4.66675ZM4.66675 21H12.8334H4.66675Z'
        fill='#495057'
      />
      <path
        d='M4.66675 21H12.8334M4.66675 7H23.3334H4.66675ZM4.66675 14H23.3334H4.66675Z'
        stroke='#111928'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
