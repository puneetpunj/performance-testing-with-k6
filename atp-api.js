import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export let options = {
  rps: 100,
  duration: '10s',
  vus: 10
};

export default function () {

  let res = http.get(`http://atp-api.uat.nonprod.bigw-online.net/remove/12/me/23`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });
  if (!success) {
    ErrorCount.add(1);
  }
  sleep(10)

}
