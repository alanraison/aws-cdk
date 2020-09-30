import * as events from '@aws-cdk/aws-events';
import * as iam from '@aws-cdk/aws-iam';
import { singletonEventRole } from './util';

/**
 * Configuration properties of an Event Bus event
 */
export interface EventBusProps {
  /**
   * ARN of the target event bus
   */
  readonly eventBusArn: string;

  /**
   * Role to be used to publish the event
   *
   * @default a new role is created.
   */
  readonly role?: iam.IRole;
}

/**
 * Notify an existing Event Bus of an event
 */
export class EventBus implements events.IRuleTarget {
  private readonly eventBusArn: string;
  private readonly role?: iam.IRole;

  constructor(props: EventBusProps) {
    this.eventBusArn = props.eventBusArn;
    this.role = props.role;
  }

  bind(rule: events.IRule, id?: string): events.RuleTargetConfig {
    if (this.role) {
      this.role.addToPolicy(this.putEventStatement());
    }
    const role = this.role ? this.role : singletonEventRole(rule, [this.putEventStatement()]);
    return {
      id: id ? id : '',
      arn: this.eventBusArn,
      role,
    };
  }

  private putEventStatement() {
    return new iam.PolicyStatement({
      actions: ['events:PutEvents'],
      resources: [this.eventBusArn],
    });
  }
}