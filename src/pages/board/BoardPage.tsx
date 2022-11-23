import { PATHS } from 'core/constants';
import { Link, useParams } from 'react-router-dom';

export const BoardPage = () => {
  const { boardId } = useParams();

  return (
    <>
      <h1>Board {boardId}</h1>
      <Link to={`/${PATHS.MAIN}`}>Back to main</Link>
    </>
  );
};
