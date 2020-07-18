import server from './io';

import createTable from './hooks/create-table';
import createUser from './hooks/create-user';

const port = process.env.PORT || 3000;

(async () => {
  await createTable();
  
  await createUser();

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
