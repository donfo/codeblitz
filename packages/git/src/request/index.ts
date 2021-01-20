import { isDevelopment } from '@ali/ide-core-common';
import { umiRequest } from '@alipay/alex-shared';
import { API } from './type';

// TODO: 放到集成侧去做
const request = umiRequest.extend({
  prefix: isDevelopment()
    ? '/code-service'
    : location.host.indexOf('.alipay.net')
    ? 'http://code.test.alipay.net'
    : 'https://code.alipay.com',
});

request.use(async (ctx, next) => {
  if (!ctx) return next();
  const {
    req: { options },
  } = ctx;
  options.credentials = 'include';
  return next();
});

export type { API };

export { request };
