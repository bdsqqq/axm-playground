export const Spinner = ({ ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M8 1.5C9.19862 1.5 10.3739 1.83143 11.3959 2.45765C12.418 3.08388 13.2469 3.98051 13.7912 5.04843C14.3355 6.11635 14.5739 7.31398 14.48 8.50892C14.3862 9.70387 13.9638 10.8496 13.2594 11.8195L12.4529 11.2337C13.0492 10.4126 13.4068 9.44257 13.4863 8.43088C13.5658 7.41918 13.3639 6.40522 12.9031 5.50107C12.4423 4.59691 11.7405 3.83779 10.8752 3.3076C10.0099 2.77741 9.01481 2.4968 8 2.4968V1.5Z"
      fill="currentColor"
    />
  </svg>
);

export const Add = ({ ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g clip-path="url(#clip0_308_995)">
      <path
        d="M8.5 7.5V2.5H7.5V7.5H2.5V8.5H7.5V13.5H8.5V8.5H13.5V7.5H8.5Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_308_995">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const ChevronDown = ({ ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g clip-path="url(#clip0_308_1324)">
      <path
        d="M8 11L3 6.00005L3.7 5.30005L8 9.60005L12.3 5.30005L13 6.00005L8 11Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_308_1324">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Sun = ({ ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export const Moon = ({ ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const CircleDotDashed = ({ ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0" />
    <path d="M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" />
    <path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8" />
    <path d="M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" />
    <path d="M13.9 21.82a9.94 9.94 0 0 1-3.8 0" />
    <path d="M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" />
    <path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8" />
    <path d="M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);
