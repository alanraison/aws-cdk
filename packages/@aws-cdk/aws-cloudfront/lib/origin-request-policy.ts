import * as core from '@aws-cdk/core';
import * as constructs from 'constructs';
import { CfnOriginRequestPolicy } from './cloudfront.generated';

/**
 * An origin request policy.
 *
 * When it’s attached to a cache behavior, the origin request policy determines the values that CloudFront includes in
 * requests that it sends to the origin. Each request that CloudFront sends to the origin includes the following:
 *
 * The request body and the URL path (without the domain name) from the viewer request.
 *
 * The headers that CloudFront automatically includes in every origin request, including Host, User-Agent, and
 * X-Amz-Cf-Id.
 *
 * All HTTP headers, cookies, and URL query strings that are specified in the cache policy or the origin request
 * policy. These can include items from the viewer request and, in the case of headers, additional ones that are added
 * by CloudFront.
 *
 * CloudFront sends a request when it can’t find an object in its cache that matches the request. If you want to send
 * values to the origin and also include them in the cache key, use CachePolicy.
 */
export interface IOriginRequestPolicy extends core.IResource {
  /**
   * The ID of this OriginRequestPolicy
   *
   * @attribute
   */
  readonly originRequestPolicyId: string;
  /**
   * The date and time when the origin request policy was last modified.
   *
   * @attribute
   */
  readonly lastModifiedTime: string;
}
/**
 * Determines whether cookies in viewer requests are included in requests that CloudFront sends to the origin.
 */
export enum CookiesCacheBehaviorType {
  /**
   * Cookies in viewer requests are not included in requests that CloudFront sends to the origin. Even when this field
   * is set to none, any cookies that are listed in a CachePolicy are included in origin requests.
   */
  NONE = 'none',
  /**
   * The cookies in viewer requests that are listed in the CookieNames type are included in requests that CloudFront
   * sends to the origin.
   */
  WHITELIST = 'whitelist',
  /**
   * All cookies in viewer requests are included in requests that CloudFront sends to the origin.
   */
  ALL = 'all',
}
/**
 * An object that determines whether any cookies in viewer requests (and if so, which cookies) are included in requests
 * that CloudFront sends to the origin.
 */
export interface CookiesConfig {
  /**
   * Determines whether cookies in viewer requests are included in requests that CloudFront sends to the origin.
   */
  readonly cookieBehavior: CookiesCacheBehaviorType,
  /**
   * Contains a list of cookie names.
   */
  readonly cookies?: string[],
}
/**
 * Determines whether any HTTP headers are included in requests that CloudFront sends to the origin.
 */
export enum HeadersCacheBehaviorType {
  /**
   * HTTP headers are not included in requests that CloudFront sends to the origin.
   *
   * Even when this field is set to none, any headers that are listed in a CachePolicy are included in origin requests.
   */
  NONE = 'none',
  /**
   * The HTTP headers that are listed in the Headers type are included in requests that CloudFront sends to the origin.
   */
  WHITELIST = 'whitelist',
  /**
   * All HTTP headers in viewer requests are included in requests that CloudFront sends to the origin.
   */
  ALL_VIEWER = 'allViewer',
  /**
   * All HTTP headers in viewer requests and the additional CloudFront headers that are listed in the Headers type are
   * included in requests that CloudFront sends to the origin. The additional headers are added by CloudFront.
   */
  ALL_VIEWER_AND_WHITELIST_CLOUDFRONT = 'allViewerAndWhitelistCloudFront',
}
/**
 * An object that determines whether any HTTP headers (and if so, which headers) are included in requests that
 * CloudFront sends to the origin.
 */
export interface HeadersConfig {
  /**
   * Determines whether any HTTP headers are included in requests that CloudFront sends to the origin
   */
  readonly headerBehavior: HeadersCacheBehaviorType;
  /**
   * Contains a list of HTTP header names.
   */
  readonly headers?: string[];
}
/**
 * Determines whether any URL query strings in viewer requests are included in requests that CloudFront sends to the
 * origin.
 */
export enum QueryStringCacheBehaviorType {
  /**
   * Query strings in viewer requests are not included in requests that CloudFront sends to the origin. Even when this
   * field is set to none, any query strings that are listed in a CachePolicy are included in origin requests.
   */
  NONE = 'none',
  /**
   * The query strings in viewer requests that are listed in the QueryStringNames type are included in requests that
   * CloudFront sends to the origin.
   */
  WHITELIST = 'whitelist',
  /**
   * All query strings in viewer requests are included in requests that CloudFront sends to the origin.
   */
  ALL = 'all',
}
/**
 * An object that determines whether any URL query strings in viewer requests (and if so, which query strings) are
 * included in requests that CloudFront sends to the origin.
 */
export interface QueryStringConfig {
  /**
   * Determines whether any URL query strings in viewer requests are included in requests that CloudFront sends to the
   * origin.
   */
  readonly queryStringBehavior: QueryStringCacheBehaviorType,
  /**
   * Contains a list of query string names.
   */
  readonly queryStrings?: string[],
}
/**
 * Origin Request Policy Properties
 */
export interface OriginRequestPolicyProps {
  /**
   * Name of the OriginRequestPolicy
   */
  readonly name: string;
  /**
   * Comment for the OriginRequestPolicy
   */
  readonly comment?: string;
  /**
   * Cookies configuration
   */
  readonly cookiesConfig: CookiesConfig;
  /**
   * Headers configuration
   */
  readonly headersConfig: HeadersConfig;
  /**
   * Query Strings configuratino
   */
  readonly queryStringsConfig: QueryStringConfig;
}

/**
 * An Origin Request Policy
 */
export class OriginRequestPolicy extends core.Resource implements IOriginRequestPolicy {
  /**
   * Lookup an OriginRequestPolicy by its unique identifier
   */
  static fromId(scope: constructs.Construct, logicalId: string, physicalId: string): IOriginRequestPolicy {
    return new class extends core.Resource implements IOriginRequestPolicy {
      readonly originRequestPolicyId: string;
      readonly lastModifiedTime: string;
      constructor() {
        super(scope, logicalId);
        this.originRequestPolicyId = physicalId;
        this.lastModifiedTime = '';
      }
    }();
  }

  readonly originRequestPolicyId: string = '';
  readonly lastModifiedTime: string = '';

  constructor(scope: constructs.Construct, id: string, props: OriginRequestPolicyProps) {
    super(scope, id);

    const resource = new CfnOriginRequestPolicy(this, 'Resource', {
      originRequestPolicyConfig: {
        name: props.name,
        comment: props.comment,
        cookiesConfig: props.cookiesConfig,
        headersConfig: props.headersConfig,
        queryStringsConfig: props.queryStringsConfig,
      },
    });

    this.originRequestPolicyId = resource.attrId;
  }
}