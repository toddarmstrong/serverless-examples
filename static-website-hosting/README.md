# static-website-hosting

This service will deploy an S3 bucket to host static website files in, a CloudFront distribution directing traffic to the files in the S3 bucket, and an optional Lambda@Edge function for further protection from attacks.

All resources are deployed in `us-east-1` region, because the Lambda@Edge function needs to be deployed in that region.

The name of the S3 bucket is defined in the custom block of the `serverless.yml` file. It has a random string appended since all S3 bucket names need to be unique (I'm sure someone has already use the bucket name `static-website`).

## Deploy

This project relys on having a hosted zone in Route 53 and a valid certificate in ACM. If you wish to deploy this just using a CloudFront distribution domain and not a custom domain remove the following sections from the `Serverless.yml` file.

```yaml
# In the DistributionConfig of the CloudFrontDistribution resource, remove the last section
# This will specify you want to use the default CloudFront SSL certificate instead of an issued one from ACM

ViewerCertificate:
    AcmCertificateArn:
        Ref: CertificationARN
    MinimumProtocolVersion: TLSv1.2_2018
    SslSupportMethod: sni-only



# Remove the whole Route53RecordSet block
# This will prevent creating an A alias record in a Route 53 hosted zone

Route53RecordSet:
    Type: AWS::Route53::RecordSet
    Properties:
        Name:
            Ref: CloudfrontAlias
        Type: A
        AliasTarget:
            DNSName:
                Fn::GetAtt: [ CloudFrontDistribution, DomainName ]
            HostedZoneId: Z2FDTNDATAQYW2 # Hardcoded based on https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-aliastarget.html#cfn-route53-aliastarget-hostedzoneid
        HostedZoneId:
            Ref: HostedZoneId
```

If you plan to use a custom domain from Route 53, enter valid default values in the Parameters section of resources

```yaml
Parameters:
    CertificationARN:
        Default: arn:aws:acm:us-east-1:************:certificate/********-****-****-****-************
        Type: String

    HostedZoneId:
        Default: "**************"
        Type: String

    CloudfrontAlias:
        Default: mywebsite.com
        Type: String
```

Once those changes have been made, simply run the deploy script

```bash
yarn run deploy
```


## Useful links

[https://serverless.com/framework/docs/providers/aws/events/cloudfront/](https://serverless.com/framework/docs/providers/aws/events/cloudfront/)