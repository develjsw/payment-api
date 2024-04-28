
## Nest.js - payment-api server
- github - [https://github.com/develjsw](https://github.com/develjsw)

### payment-api 구성

| 위치                        | 설명                                |
|---------------------------|--------------------------------------|
| payment-api                | 프로젝트 최상단                         |
| payment-api > dockerfile   | dockerfile                           |
| payment-api > docker-compose.yml | docker-compose.yml |
| payment-api > secret       | DB 접속 정보 등 secret file            |
| payment-api > src > config | 환경별 설정 파일                          |

### 특이사항

mysql AWS RDB → docker image 사용으로 변경

### docker 실행
~~~
[ 1번 방식 - dockerfile (** RDB 사용시에만 아래 명령어로 진행 **) ]

# payment-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/payment-api

# 도커 이미지 빌드 (local)
$ docker build -t payment-api -f ./dockerfile/Dockerfile-local .

# 도커 컨테이너 실행
$ docker run -d --name payment-api -p 3003:8003 payment-api

----------------------------------------------------------------

** 문제 발생 시 확인 (docker gui tool을 활용해도 됨) **

# 종료된 컨테이너 재실행
$ docker start payment-api

# 컨테이너 로그 확인 
$ docker logs payment-api

# 컨테이너 접속하여 정상 실행중인지 확인
$ docker ps
$ docker exec -it <container_id> bash
~~~

~~~
[ 2번 방식 - dockerfile + docker-compose.yml ]

# payment-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/payment-api

# 이미지 빌드 및 컨테이너 실행 (백그라운드로 실행)
$ docker-compose up -d --build
~~~

### docker container ip 확인
~~~
[ 1번 방식 ]

# docker network 조회
$ docker network ls

# 위에서 조회한 값 중에 내가 설정한 네트워크 값으로 조회
$ docker network inspect <docker network name>
ex) docker network inspect payment-api_msa-api-network
→ containers에 표시되어 있는 IP를 통해 확인 가능하며, 해당 아이피는 외부 접근이 아닌 container끼리 통신할 때 사용
~~~
~~~
[ 2번 방식 ]

# 컨테이너 접속 (쉘 종류에 따라 사용 가능한 명령어 차이 존재)
$ docker exec -it <container id> </bin/sh | /bin/bash | bash>
ex) docker exec -it a4e61eccfb72 /bin/sh

# 아이피 조회
$ ip addr
~~~
~~~
[ 3번 방식 ]

# 특정 container의 docker network 정보 확인
$ docker inspect "{{ .NetworkSettings }}" <container id>
→ NetworkSettings.Networks.<설정한 네트워크>.IPAddress를 통해 container ip 확인
~~~

### docker container 통신 확인
1. host ↔ api container 통신
   - [ 1번 방식 ] : browser에서 localhost:3003로 접속하여 확인 
   - [ 2번 방식 ] : host CLI(cmd/powershell/git bash)에서 아래 명령어 실행 
   ~~~
   # host에서 curl 명령어를 통해 확인
   $ curl http://localhost:3003
   ~~~ 
2. api container ↔ db container 통신
   ~~~
   # 컨테이너 접속 (쉘 종류에 따라 사용 가능한 명령어 차이 존재)
   $ docker exec -it <container id> </bin/sh | /bin/bash | bash>
   ex) docker exec -it a4e61eccfb72 /bin/sh
   
   # 'api 컨테이너 내부'에서 '호스트명:db 컨테이너 포트'에 연결되는지 확인
   $ telnet host.docker.internal:3306
   ~~~
   
### 컨테이너 오케스트레이션 사용 예정
(Docker Swarm 또는 Kubernetes)