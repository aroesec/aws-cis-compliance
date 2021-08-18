import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CloudComplianceCisBaseline from '../lib/cloud-compliance-cis-baseline-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CloudComplianceCisBaseline.CloudComplianceCisBaselineStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
