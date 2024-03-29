# Serverless framework examples

Serverless framework projects to show how to deploy different type of resources.

Currently all examples are for AWS, but may look to expand it to other cloud platforms in the future.

## Prerequisites

Make sure you have the Serverless CLI and AWS CLI installed globally.

[Serverless CLI install guide](https://serverless.com/framework/docs/providers/aws/guide/installation/)

[AWS CLI install guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

## Guide

Start with renaming the `.env.example` file to `.env` and change the PROFILE variable to the name of a AWS profile with Admin access to your account, so that the Serverless CLI can deploy all the necessary resources, the STAGE to use for the deployment, and the REGION you want to deploy your resources to (note: some resource will be hard coded to deploy in the us-east-1 region because of resource limitations).

All resource naming depends on the stage, so you will be able to deploy separate instances of the examples for different stages (ex dev, staging, test, production).

Install the dependancies to inject the environment variables:

```bash
yarn install
```

## Useful links

[https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

[https://serverless.com/framework/docs/providers/aws/guide/resources/](https://serverless.com/framework/docs/providers/aws/guide/resources/)