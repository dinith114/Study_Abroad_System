import React from 'react';

function PageTitle({ title }) {
  return (
    <h1 className="font-medium text-3xl mb-6 text-center bg-blue-100 p-5 rounded-lg text-grNavTextHov">
      {title}
    </h1>
  );
}

export default PageTitle;
