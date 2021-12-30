import { check } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";
export let errorCounter = new Counter('errors');
export let options = {
  thresholds: {
    errors: ['count<1'],
  },
};

export default function () {
    const url = `${__ENV.SERVER}/api/?os=Android&version_code=41&is_china=0`;
  const res = http.get(url,{
    headers: {
      
    }
  });
  const success = check(res, {
    'is status 200': (r) => r.status === 200,
    'is api version "v3"': (r) => r.json('data.api_version') === 'v3',
    'is force update false': (r) => r.json('data.force_update') === true,
    'is version name "1.4.1"': (r) => r.json('data.version_name') === '1.4.1',
    'is version code "42"': (r) => r.json('data.version_code') === '42',
    'is app store null': (r) => r.json('data.app_store') === null,
    'is package name null': (r) => r.json('data.package_name') === null,
    'is update url null': (r) => r.json('data.update_url') === null,
    'is force update date null': (r) => r.json('data.force_update_date') === null,
    'is force update date remaining 0': (r) => r.json('data.force_update_date_remaining') === 0,
  });
  errorCounter.add(!success);
}