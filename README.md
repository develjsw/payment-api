
## Nest.js - payment-api server
- github - [https://github.com/develjsw](https://github.com/develjsw)

### payment-api 구성

| 위치                        | 설명                                 |
|---------------------------|---------------------------------------|
| payment-api                | 프로젝트 최상단                          |
| payment-api > dockerfile   | dockerfile                            |
| payment-api > secret       | DB 접속 정보 등 secret file             |

### 특이사항

mysql은 별도의 dockerfile없이 AWS RDB를 사용하여 연결

### docker 실행
~~~
# payment-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/payment-api

# 도커 이미지 빌드 (local)
$ docker build -t payment-api -f ./dockerfile/Dockerfile-local .

# 도커 컨테이너 실행
$ docker run -d --name payment-api -p 8003:8003 payment-api

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

### 컨테이너 오케스트레이션 사용 예정
(Docker Swarm 또는 Kubernetes)