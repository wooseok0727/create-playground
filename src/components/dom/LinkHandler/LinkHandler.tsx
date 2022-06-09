import Link from 'next/link';

interface Props {
  elHref?: string;
  isExternal?: boolean;
  onClickFn?: () => void;
  children: React.ReactNode;
}

export const LinkHandler = (props: Props) => {
  const { elHref, isExternal, onClickFn, children } = props;

  return (
    <>
      {isExternal ? (
        <a style={{ display: 'flex' }} href={elHref} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      ) : onClickFn ? (
        <button style={{ display: 'flex' }} onClick={() => onClickFn()}>
          {children}
        </button>
      ) : (
        elHref && (
          <Link href={elHref} passHref>
            <a style={{ display: 'flex' }}>{children}</a>
          </Link>
        )
      )}
    </>
  );
};
