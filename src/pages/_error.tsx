import type { NextPageContext } from 'next';

interface ErrorProps {
  statusCode: number;
}

export default function ErrorServer({ statusCode }: ErrorProps) {
  return (
    <div>
      <p>Error | {statusCode || 'occurred on client'}</p>
    </div>
  );
}

ErrorServer.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
