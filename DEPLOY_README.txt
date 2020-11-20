

deploy.sh
    - Syntax: deploy.sh <linode | plato>" [sourceonly]
    - If there are changes in our source code only (no packages change) use option "sourceonly", it's faster
    - list of files being deployed:
      - Without "sourceonly" option: file deploy.list
      - With "sourceonly" option: file deploy.list.source

- Deploy after change in SERVER source code only:
  >> Update file version.txt
  $ deploy.sh <linode | plato> [sourceonly]

- Deploy after change in CLIENT source code:
  >> Update file version.txt
  $ cd client
  $ yarn build
  $ cd ..
  $ deploy.sh <linode | plato> [sourceonly]

- On production || stage server:
  $ cd /u/local/apps/AlmanacService
  $ service AlmanacService stop
  $ tar -xvf /home/ifer/transit/AlmanacService-<VERSION>.tgz
  $ service AlmanacService start

- Start script /u/local/apps/AlmanacService.start
- Service config file: /etc/systemd/system/AlmanacService.service
