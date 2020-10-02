import '@aws-cdk/assert/jest';
import * as core from '@aws-cdk/core';
import { OriginRequestPolicy, CookiesCacheBehaviorType, HeadersCacheBehaviorType, QueryStringCacheBehaviorType } from '../lib';

let app: core.App;
let stack: core.Stack;

beforeEach(() => {
  app = new core.App();
  stack = new core.Stack(app, 'Stack');
});

test('simple OriginRequestPolicy renders properly', () => {
  new OriginRequestPolicy(stack, 'CustomOriginRequestPolicy', {
    name: 'OriginRequestPolicy',
    comment: 'comment',
    cookiesConfig: {
      cookieBehavior: CookiesCacheBehaviorType.WHITELIST,
      cookies: ['x-my-cookie'],
    },
    headersConfig: {
      headerBehavior: HeadersCacheBehaviorType.WHITELIST,
      headers: ['x-my-header'],
    },
    queryStringsConfig: {
      queryStringBehavior: QueryStringCacheBehaviorType.WHITELIST,
      queryStrings: ['myQueryString'],
    },
  });
  expect(stack).toHaveResource('AWS::CloudFront::OriginRequestPolicy', {
    OriginRequestPolicyConfig: {
      Name: 'OriginRequestPolicy',
      Comment: 'comment',
      CookiesConfig: {
        CookieBehavior: 'whitelist',
        Cookies: ['x-my-cookie'],
      },
      HeadersConfig: {
        HeaderBehavior: 'whitelist',
        Headers: ['x-my-header'],
      },
      QueryStringsConfig: {
        QueryStringBehavior: 'whitelist',
        QueryStrings: ['myQueryString'],
      },
    },
  });
});

test('an OriginRequestPolicy with different behaviors', () => {
  new OriginRequestPolicy(stack, 'OriginRequestPolicy', {
    name: 'DifferentOriginRequestPolicy',
    cookiesConfig: {
      cookieBehavior: CookiesCacheBehaviorType.ALL,
    },
    headersConfig: {
      headerBehavior: HeadersCacheBehaviorType.ALL_VIEWER_AND_WHITELIST_CLOUDFRONT,
    },
    queryStringsConfig: {
      queryStringBehavior: QueryStringCacheBehaviorType.NONE,
    },
  });
  expect(stack).toHaveResource('AWS::CloudFront::OriginRequestPolicy', {
    OriginRequestPolicyConfig: {
      Name: 'DifferentOriginRequestPolicy',
      CookiesConfig: {
        CookieBehavior: 'all',
      },
      HeadersConfig: {
        HeaderBehavior: 'allViewerAndWhitelistCloudFront',
      },
      QueryStringsConfig: {
        QueryStringBehavior: 'none',
      },
    },
  });
});