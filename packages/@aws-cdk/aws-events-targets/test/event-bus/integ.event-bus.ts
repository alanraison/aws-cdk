/// !cdk-integ pragma:ignore-assets
import * as cdk from '@aws-cdk/core';

const app = new cdk.App();

class EventBus extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}

new EventBus(app, 'event-id-stack');
app.synth();
