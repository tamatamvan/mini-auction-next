import { type ReactNode } from 'react';

type TPageHeadingProps = {
  children: ReactNode;
};

const PageHeading = ({ children }: TPageHeadingProps) => (
  <h1 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
    {children}
  </h1>
);

export default PageHeading;
