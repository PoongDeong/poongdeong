const plan = require('flightplan');

const IMAGE = 'poongdeong-server';
const ECR = '964037622278.dkr.ecr.ap-northeast-2.amazonaws.com'
const WORKING_DIRECTORY = 'poongdeong';

plan.target('production', {
  host: '15.164.39.149',
  username: 'ec2-user',
  agent: process.env.SSH_AUTH_SOCK
});

plan.remote('deploy', (transport) => {
  const commitID = transport.prompt('Please type commit ID [a1b2c3d]');

  transport.exec('$(aws ecr get-login --no-include-email --region ap-northeast-2)')

  transport.with(`cd ${WORKING_DIRECTORY}`, () => {
    transport.exec(`docker pull ${ECR}/${IMAGE}:${commitID}`);

    transport.exec(
      `docker tag ${ECR}/${IMAGE}:${commitID} ${IMAGE}`)

    transport.exec(`docker-compose down`)
    transport.exec(`docker-compose up -d`)
  });
});

