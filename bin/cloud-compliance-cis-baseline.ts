#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CloudComplianceCisBaselineStack } from '../lib/cloud-compliance-cis-baseline-stack';
import { CloudComplianceUserStack } from '../lib/cloud-compliance-cis-user-stack'
const app = new cdk.App();

new CloudComplianceCisBaselineStack(app, 'CloudComplianceCisBaselineStack', {
});

new CloudComplianceUserStack(app, 'CloudComplianceUserStack',{

});