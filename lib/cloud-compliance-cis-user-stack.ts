import cdk = require('@aws-cdk/core')
import * as logs from '@aws-cdk/aws-logs';
import s3 = require("@aws-cdk/aws-s3");
import * as cloudtrail from '@aws-cdk/aws-cloudtrail';
import cloudwatch = require('@aws-cdk/aws-cloudwatch');
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda"
import path = require('path');
import events = require("@aws-cdk/aws-events");
import * as targets from "@aws-cdk/aws-events-targets";
import { SecretValue } from '@aws-cdk/core';
import { stringify } from 'querystring';
require('dotenv').config()



export class CloudComplianceUserStack extends cdk.Stack {
    private readonly cisUserPassword:string = process.env.CIS_USER_PASSWORD!;
    private readonly testUserPassword:string = process.env.TEST_USER_PASSWORD!;
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
    const cisUser = new iam.User(this, 'CisUser',{
        userName: 'CisUser',
        password: SecretValue.plainText(this.cisUserPassword),
        passwordResetRequired: true,
    })
    const testUser = new iam.User(this,'TestUser',{
        userName:'TestUser',
        password: SecretValue.plainText(this.testUserPassword),
        passwordResetRequired: true,
    })
    const adminGroup = new iam.Group(this,'AdminGroup',{
        managedPolicies:[
            iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
        ]
    })
    const auditGroup = new iam.Group(this,'AuditGroup',{
        managedPolicies:[
            iam.ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess")
        ]
    })

    adminGroup.addUser(cisUser)
    auditGroup.addUser(testUser)
    }
}