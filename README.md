# causes-donation-portal
Angel Protocol Causes donation portal app

## Instructions to deploy a new portal to production
1. Make a new repo from this template repo
2. Setup a new Web App AWS Amplify app and connect it to the new repo
3. Setup the build.yml file as follows:
```
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - REACT_APP_ANGEL_INDEX_FUND_ADDR=${REACT_APP_ANGEL_INDEX_FUND_ADDR}
        - REACT_APP_ETH_CHAIN_ID=${REACT_APP_ETH_CHAIN_ID}
        - REACT_APP_FUND_ID=${REACT_APP_FUND_ID}
        - REACT_APP_BNB_CHAIN_ID=${REACT_APP_BNB_CHAIN_ID}
        - REACT_APP_JWT_SECRET_KEY=${REACT_APP_JWT_SECRET_KEY}
        - REACT_APP_DONATION_INFO_GET_ROUTE=${REACT_APP_DONATION_INFO_GET_ROUTE}
        - REACT_APP_DONATION_POST_ROUTE=${REACT_APP_DONATION_POST_ROUTE}
        - REACT_APP_DESIRED_DONATION_AMT=${REACT_APP_DESIRED_DONATION_AMT}
        - REACT_APP_DONATION_IMAGE=${REACT_APP_DONATION_IMAGE}
        - REACT_APP_HERO_VIDEO=${REACT_APP_HERO_VIDEO}
        - REACT_APP_HERO_TITLE=${REACT_APP_HERO_TITLE}
        - REACT_APP_DONATION_TITLE=${REACT_APP_DONATION_TITLE}
        - REACT_APP_DONATION_SUBTITLE=${REACT_APP_DONATION_SUBTITLE}
        - yarn build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
```
4. Configure the following environment variables with these varialbe and their values (ask a team member!):
```
REACT_APP_ANGEL_INDEX_FUND_ADDR: juno1ztfa658hzrny7gjvupljvvq2mxzkaa0glf0tk529wcwl0netg3kstwmhgj
REACT_APP_BNB_CHAIN_ID: 56
REACT_APP_DESIRED_DONATION_AMT: 1000000000
REACT_APP_DONATION_INFO_GET_ROUTE: https://???.amazonaws.com/donations-metrics?app=<app-name-slug>
REACT_APP_DONATION_POST_ROUTE: https://???.amazonaws.com/donation?app=<app-name-slug>
REACT_APP_ETH_CHAIN_ID: 1
REACT_APP_FUND_ID: ##
REACT_APP_JWT_SECRET_KEY: ???
```

## DEVELOPMENT NOTES
- Create a *.env* file with the above env vars and add `GENERATE_SOURCEMAP=false` to ignore sourcemap-related errors when starting the webapp

