import MangoTokenContract from 'abis/MangoToken.json';
import StagingMangoTokenContract from 'abis/staging/MangoToken.json';
import SaltTokenContract from 'abis/SaltToken.json';
import MangoTreeContract from 'abis/MangoTree.json';

import SmartContract from './base';

const DEV = 'development';
const STAGING = 'staging';
const PRODUCTION = 'production';

export const MANGO_TOKEN = 'MANGO_TOKEN';

export const SALT_TOKEN = 'SALT_TOKEN';

export const MANGO_TREE = 'MANGO_TREE';

const CONTRACTS = {
  [DEV]: {
    [MANGO_TOKEN]: {
      abi: MangoTokenContract,
    },
    [SALT_TOKEN]: {
      abi: SaltTokenContract,
    },
    [MANGO_TREE]: {
      abi: MangoTreeContract,
    },
  },
  [STAGING]: {
    [MANGO_TOKEN]: {
      abi: MangoTokenContract,
    },
    [SALT_TOKEN]: {
      abi: SaltTokenContract,
    },
    [MANGO_TREE]: {
      abi: MangoTreeContract,
    },
  },
  [PRODUCTION]: {
    [MANGO_TOKEN]: {
      address: '0xc6884F397eA41ad3C828D52F2ecB74eB17dA365c',
      abi: StagingMangoTokenContract,
    },
  },
};

export {
  SmartContract,
};

export default CONTRACTS[process.env.NEXT_PUBLIC_APP_ENV || DEV];
