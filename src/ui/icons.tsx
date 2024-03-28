export const Spinner = ({ ...props }: React.ComponentProps<"svg">) => (
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

export const Add = ({ ...props }: React.ComponentProps<"svg">) => (
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

export const ChevronDown = ({ ...props }: React.ComponentProps<"svg">) => (
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
