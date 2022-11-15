import './Board.scss';
import { useRef, useEffect } from 'react';
import { Column } from '../Column/Column';

function Board() {
  const listColumnsRef = useRef<HTMLUListElement>(null);
  const data = [
    {
      id: 'sbalgr',
      title: 'some',
      order: 1,
      tasks: [
        {
          id: 'sbalgr',
          title: 'some',
          order: 1,
          description: 'kjrgn',
          userID: null,
        },
      ],
    },
    {
      id: 'sbalgr',
      title: 'some',
      order: 2,
      tasks: [
        {
          id: 'sbalgr',
          title: 'some',
          order: 1,
          description: 'kjrgn',
          userID: null,
        },
      ],
    },
  ];

  // useEffect(() => {
  //   dispatch(fetchCards({ limitData, currentPage, searchString }));
  // }, [limitData, currentPage, searchString, dispatch]);

  const addColumn = () => {
    const x = {
      id: '6666',
      title: '6666',
      order: 1,
      tasks: [
        {
          id: '6666',
          title: '66666',
          order: 1,
          description: '66666',
          userID: null,
        },
      ],
    };
    data.push(x);
    console.log(data);
  };

  return (
    <div className="container-tasks">
      <ul className="container-columns" ref={listColumnsRef}>
        {data.map((el, ind) => (
          <li className="column" key={ind}>
            <Column dataColumn={el} />
          </li>
        ))}
      </ul>
      <div className="container-add-button">
        <button className="add-button" onClick={addColumn}>
          + Add column
        </button>
      </div>
    </div>
  );
}

export { Board };
